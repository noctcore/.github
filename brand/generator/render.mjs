// Render one banner set from a spec: README headers (light and dark, SVG and
// PNG), the social preview (SVG and PNG) and, when asked, the org profile
// banner PNG. Usage: node render.mjs <spec.json> <out-dir>
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import console from 'node:console';
import process from 'node:process';
import { Resvg } from '@resvg/resvg-js';
import {
  document, faces, field, lettering, lockup, marks, measure, palettes, passage, ribbon, tokens,
} from './brand.mjs';

const [specPath, outArg] = process.argv.slice(2);
if (!specPath || !outArg) {
  console.error('usage: node render.mjs <spec.json> <out-dir>');
  process.exit(2);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const out = resolve(outArg);
mkdirSync(out, { recursive: true });
const rects = Array.isArray(spec.mark) ? spec.mark : marks[spec.mark];
if (!rects) throw new Error(`unknown mark ${spec.mark}`);

// Copy rules the generator enforces rather than leaves to taste.
const banned = /[–—]/;
for (const text of [spec.name, spec.headline, spec.subline, spec.alt, spec.description, spec.eyebrow ?? '',
  spec.diagram.start, spec.diagram.end, ...spec.diagram.gates.flatMap((g) => [g.name, ...(g.stops ?? [])])]) {
  if (banned.test(text)) throw new Error(`no em or en dashes: ${text}`);
}
const fit = (label, value, size, face, spacing, max) => {
  const width = measure(value, size, face, spacing);
  if (width > max) throw new Error(`${label} is ${Math.round(width)} px wide, the limit is ${max}: shorten it`);
};
fit('headline', spec.headline, 54, faces.display, -1.3, 620);
fit('subline', spec.subline, 23, faces.sans, 0, 615);
fit('wordmark', spec.name, 43 * 0.9, faces.display, -0.4 * 0.9, 560 - 72 * 0.9);

const header = (palette) =>
  field(palette, 1280, 360) +
  lockup(rects, spec.name, 88, 56, 0.9, palette) +
  lettering(spec.headline, 88, 207, 54, palette.foreground, faces.display, -1.3) +
  lettering(spec.subline, 90, 256, 23, palette.secondary) +
  `<g transform="${tokens.diagram.headerTransform}">${passage(spec.diagram, rects, palette)}</g>`;

const files = {};
const title = `${spec.name}. ${spec.headline}`;
for (const theme of ['dark', 'light']) {
  files[`readme-header-${theme}.svg`] = document(1280, 360, title, spec.description, header(palettes[theme]));
}
const social = (palette) =>
  field(palette, 1280, 640) +
  lockup(rects, spec.name, 104, 76, 0.82, palette) +
  (spec.eyebrow
    ? lettering(spec.eyebrow, 1176 - measure(spec.eyebrow, 13, faces.mono, 1.1), 113, 13, palette.accent, faces.mono, 1.1)
    : '') +
  lettering(spec.headline, 104, 234, 65, palette.foreground, faces.display, -1.4) +
  lettering(spec.subline, 107, 283, 25, palette.secondary) +
  `<g transform="translate(119 331)">${ribbon(spec.diagram, rects, palette)}</g>`;
files['social-preview.svg'] = document(1280, 640, title, spec.description, social(palettes.dark));

const png = (source, width) =>
  new Resvg(source, { font: { loadSystemFonts: false }, fitTo: { mode: 'width', value: width } }).render().asPng();

for (const [name, source] of Object.entries(files)) {
  if (/<(?:image|text|script|foreignObject)\b/i.test(source)) throw new Error(`${name}: outlined geometry only`);
  writeFileSync(resolve(out, name), source);
}
const rasters = {
  'readme-header-dark.png': [files['readme-header-dark.svg'], 2560],
  'readme-header-light.png': [files['readme-header-light.svg'], 2560],
  'social-preview.png': [files['social-preview.svg'], 1280],
};
if (spec.profile) rasters['banner.png'] = [files['readme-header-dark.svg'], 1280 * tokens.size.profile.export];
for (const [name, [source, width]] of Object.entries(rasters)) {
  const data = png(source, width);
  if (name === 'social-preview.png' && data.length >= 1_000_000) throw new Error('social preview must stay under 1 MB');
  writeFileSync(resolve(out, name), data);
  console.log(`${name}: ${data.readUInt32BE(16)}x${data.readUInt32BE(20)}, ${data.length} bytes`);
}
writeFileSync(resolve(out, 'alt.txt'), `${spec.alt}\n`);
console.log(`Wrote ${Object.keys(files).length} SVGs to ${out}`);
