// Render every spec in ../specs into ../out/<version>/<name>, plus a mark sheet.
// Usage: node build.mjs [version]   (default: current)
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import process from 'node:process';
import { document, mark, marks, palettes, lettering, faces } from './brand.mjs';

const version = process.argv[2] ?? 'current';
const specs = readdirSync(new URL('../specs/', import.meta.url)).filter((name) => name.endsWith('.json'));
for (const spec of specs) {
  const name = spec.replace(/\.json$/, '');
  execFileSync(process.execPath, ['render.mjs', `../specs/${spec}`, `../out/${version}/${name}`], {
    cwd: new URL('./', import.meta.url),
    stdio: 'inherit',
  });
}
// Mark sheet: every mark at 64, 32 and 16 px on both fields.
const names = Object.keys(marks);
let body = '';
['dark', 'light'].forEach((theme, row) => {
  const p = palettes[theme];
  body += `<rect x="0" y="${row * 150}" width="${names.length * 150}" height="150" fill="${p.background}"/>`;
  names.forEach((key, i) => {
    const x = i * 150 + 20;
    const y = row * 150 + 16;
    body += mark(marks[key], x, y, 64, p.accent) + mark(marks[key], x + 76, y + 16, 32, p.accent) + mark(marks[key], x + 76, y + 56, 16, p.accent);
    body += lettering(key, x, y + 116, 12, p.secondary, faces.mono);
  });
});
mkdirSync(new URL(`../out/${version}/`, import.meta.url), { recursive: true });
writeFileSync(new URL(`../out/${version}/marks.svg`, import.meta.url),
  document(names.length * 150, 300, 'noctcore marks', 'Every family mark at 64, 32 and 16 pixels on night and paper.', body));
console.log(`Built ${specs.length} banner sets and the mark sheet into out/${version}`);
