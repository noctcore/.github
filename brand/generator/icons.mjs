// Render the org icon set from the noctcore mark: favicon, logo tile,
// transparent mark and the 1024 px avatar PNG.
// Usage: node icons.mjs [outDir]   (default: .., the brand folder)
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { Resvg } from '@resvg/resvg-js';
import { document, field, mark, marks, palettes } from './brand.mjs';

const out = process.argv[2] ?? new URL('..', import.meta.url).pathname;
const night = palettes.dark;
const rects = marks.noctcore;

// The mark's occupied area is 40 of its 64 units. Each icon sets how much of
// its own square that area fills: more at favicon size, where every pixel counts.
const fit = (canvas, share) => {
  const size = (canvas * share * 64) / 40;
  return { size, at: (canvas - size) / 2 };
};

function favicon() {
  const { size, at } = fit(64, 0.78);
  return document(64, 64, 'noctcore favicon', 'The noctcore mark, closed above and below and open at the core, in steel blue on a night square.',
    `<rect width="64" height="64" fill="${night.background}"/>` + mark(rects, at, at, size, night.accent));
}

function tile() {
  // The flat mark on the night field and its 40 unit grid. The solid block
  // form muddies at 32 px (its side faces read as a second stroke), so the
  // avatar stays flat.
  const { size, at } = fit(512, 0.64);
  return document(512, 512, 'noctcore logo tile', 'The noctcore mark, closed above and below and open at the core, in steel blue on the night field with its construction grid.',
    field(night, 512, 512) + mark(rects, at, at, size, night.accent));
}

function transparent() {
  const { size, at } = fit(512, 0.86);
  return document(512, 512, 'noctcore transparent logo mark', 'The noctcore mark in steel blue on a transparent background, closed above and below and open at the core.',
    mark(rects, at, at, size, night.accent));
}

const files = { 'favicon.svg': favicon(), 'logo-tile.svg': tile(), 'logo-mark-transparent.svg': transparent() };
mkdirSync(join(out, 'png'), { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg);
const png = new Resvg(files['logo-tile.svg'], { font: { loadSystemFonts: false }, fitTo: { mode: 'width', value: 1024 } }).render().asPng();
writeFileSync(join(out, 'png', 'avatar.png'), png);
console.log(`Wrote ${Object.keys(files).join(', ')} and png/avatar.png (1024 x 1024) to ${out}`);
