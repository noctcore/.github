// The noctcore blueprint language: palettes, outlined lettering, marks and the
// passage diagram. Every visible letter is a path, so a rendered SVG needs no
// fonts, scripts, network requests or raster images.
import { fileURLToPath, URL } from 'node:url';
import * as fontkit from 'fontkit';
import tokens from '../tokens.json' with { type: 'json' };

const directory = new URL('./', import.meta.url);
const variable = fontkit.openSync(fileURLToPath(new URL('fonts/Manrope.ttf', directory)));
export const faces = {
  sans: variable.getVariation({ wght: 550 }),
  display: variable.getVariation({ wght: 600 }),
  mono: fontkit.openSync(fileURLToPath(new URL('fonts/DMMono-Regular.ttf', directory))),
};

/** Night and paper palettes, read from tokens.json (the single source of truth). */
export const palettes = Object.fromEntries(
  ['dark', 'light'].map((theme) => [
    theme,
    Object.fromEntries(Object.entries(tokens.color).map(([role, value]) => [role, value[theme]])),
  ]),
);

const round = (value) => Number(value.toFixed(3));
export const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

/** The advance width of a run of text. */
export function measure(value, size, face = faces.sans, spacing = 0) {
  const run = face.layout(value);
  const scale = size / face.unitsPerEm;
  return run.positions.reduce((sum, position) => sum + position.xAdvance * scale + spacing, 0);
}

export function lettering(value, x, y, size, color, face = faces.sans, spacing = 0) {
  const run = face.layout(value);
  const scale = size / face.unitsPerEm;
  const preciseScale = Number(scale.toFixed(6));
  let cursor = x;
  const paths = run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index];
      const d = glyph.path.toSVG();
      const out = d
        ? `<path d="${d}" transform="translate(${round(cursor + position.xOffset * scale)} ${round(y - position.yOffset * scale)}) scale(${preciseScale} ${-preciseScale})"/>`
        : '';
      cursor += position.xAdvance * scale + spacing;
      return out;
    })
    .join('');
  return `<g fill="${color}" aria-label="${escape(value)}">${paths}</g>`;
}

export function document(width, height, title, description, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">${escape(title)}</title><desc id="desc">${escape(description)}</desc>${content}</svg>\n`;
}

export function rectangle(x, y, width, height, fill, radius = 0, stroke = 'none') {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
}

export function line(path, color, width = 1, extra = '') {
  return `<path d="${path}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;
}

/** The night or paper field with its quiet 40 unit construction grid. */
export function field(palette, width, height) {
  const { cell, opacity } = tokens.grid;
  return (
    `<defs><pattern id="grid" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse"><path d="M${cell} 0H0V${cell}" fill="none" stroke="${palette.grid}" stroke-width="1"/></pattern></defs>` +
    rectangle(0, 0, width, height, palette.background) +
    `<g opacity="${opacity}">${rectangle(0, 0, width, height, 'url(#grid)')}</g>`
  );
}

/*
 * Marks. Each is a set of rectangles on a 64 unit canvas: occupied area
 * x=12..52, y=12..52, an exact four unit grid, eight unit strokes and a visible
 * eight unit core square. A mark is drawn from rectangles so the solid version
 * (side faces, hairline top edges) can be derived instead of hand drawn.
 */
export const marks = {
  // Two offset open corners around the core: a login passing through.
  auth: [
    [12, 12, 28, 8], [12, 20, 8, 20],
    [24, 44, 28, 8], [44, 24, 8, 20],
    [28, 28, 8, 8],
  ],
  // Two brackets hold the core: a repository held to its own rules.
  harness: [
    [12, 12, 16, 8], [12, 20, 8, 24], [12, 44, 16, 8],
    [36, 12, 16, 8], [44, 20, 8, 24], [36, 44, 16, 8],
    [28, 28, 8, 8],
  ],
  // Held passage: closed above and below, open left and right at the core's
  // height. Work passes through; nothing passes around.
  noctcore: [
    [12, 12, 40, 8], [12, 20, 8, 4], [44, 20, 8, 4],
    [12, 44, 40, 8], [12, 40, 8, 4], [44, 40, 8, 4],
    [28, 28, 8, 8],
  ],
  // An arch: one policy spans the work and the gates stand on either side.
  nightcore: [
    [12, 12, 40, 8], [12, 20, 8, 32], [44, 20, 8, 32],
    [28, 28, 8, 8],
  ],
  // A terminal with its title bar lifted off: the window detaches, the
  // frame and its cursor (the core) stay where they are.
  nysia: [
    [12, 12, 40, 8],
    [12, 24, 8, 28], [44, 24, 8, 28], [20, 44, 24, 8],
    [24, 28, 8, 8],
  ],
  // Lines of code: one token on the middle line (the core) is held apart
  // and underlined, the way a lint report marks the exact place.
  'eslint-plugins': [
    [12, 12, 40, 8],
    [12, 28, 12, 8], [28, 28, 8, 8], [40, 28, 12, 8],
    [24, 44, 16, 8],
  ],
  // A viewfinder: four corners frame the core.
  'showcase-kit': [
    [12, 12, 16, 8], [12, 20, 8, 8], [36, 12, 16, 8], [44, 20, 8, 8],
    [12, 44, 16, 8], [12, 36, 8, 8], [36, 44, 16, 8], [44, 36, 8, 8],
    [28, 28, 8, 8],
  ],
};

const rectPath = (rects, dy = 0) =>
  rects.map(([x, y, w, h]) => `M${x} ${y + dy}h${w}v${h}h${-w}z`).join('');

export function mark(rects, x, y, size, color) {
  return `<g transform="translate(${x} ${y}) scale(${round(size / 64)})"><path d="${rectPath(rects)}" fill="${color}"/></g>`;
}

/** Top edges that are not covered by another rectangle directly above. */
function topEdges(rects) {
  let d = '';
  for (const [x, y, w] of rects) {
    // Collect covered spans on this edge.
    const covered = rects
      .filter(([, oy, , oh]) => oy + oh === y)
      .map(([ox, , ow]) => [Math.max(ox, x), Math.min(ox + ow, x + w)])
      .filter(([a, b]) => b > a)
      .sort((a, b) => a[0] - b[0]);
    let cursor = x;
    for (const [a, b] of covered) {
      if (a > cursor) d += `M${cursor} ${y}H${a}`;
      cursor = Math.max(cursor, b);
    }
    if (cursor < x + w) d += `M${cursor} ${y}H${x + w}`;
  }
  return d;
}

/** The mark as a solid block: side faces below, the face on top, a hairline on its upper edges. */
export function block(rects, cx, cy, size, palette) {
  const depth = tokens.diagram.blockDepth;
  return (
    `<g transform="translate(${round(cx - size / 2)} ${round(cy - size / 2)}) scale(${round(size / 64)})">` +
    `<path d="${rectPath(rects, depth)}" fill="${palette.side}"/>` +
    `<path d="${rectPath(rects)}" fill="${palette.accent}"/>` +
    line(topEdges(rects), palette.foreground, 0.55) +
    '</g>'
  );
}

/** Where the top of the mark sits, for capping a stopped branch on it. */
const markTop = (rects) => Math.min(...rects.map(([, y]) => y));

/** A stopped branch: dashed, ending in a perpendicular cap and a dot. */
export function stopped(path, capX, capY, palette) {
  return (
    line(path, palette.stop, 2, 'stroke-dasharray="5 7"') +
    line(`M${round(capX - 9)} ${round(capY)}h18`, palette.stop, 3) +
    `<circle cx="${round(capX)}" cy="${round(capY)}" r="3" fill="${palette.stop}"/>`
  );
}

function forwardTick(x, y, palette, angle) {
  // A small open chevron pointing along the route.
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const p = (dx, dy) => `${round(x + dx * c - dy * s)} ${round(y + dx * s + dy * c)}`;
  return line(`M${p(-4, -5)}L${p(3, 0)}L${p(-4, 5)}`, palette.accent, 2);
}

/*
 * The passage: the product's real path as one rising line on a raised bed,
 * with one solid block per step and dashed, capped branches for what each step
 * stops. All coordinates share a 1040 x 640 drawing space; the README header
 * places it at 0.49 scale, so labels are drawn large here.
 */
export function passage(spec, rects, palette) {
  const { gates, start, end } = spec;
  if (gates.length < 2 || gates.length > 4) throw new Error('a passage has 2 to 4 steps');
  const stops = gates.flatMap((gate) => gate.stops ?? []);
  if (stops.length > 3) throw new Error('a passage carries at most 3 stopped labels');
  if (gates.some((gate) => (gate.stops ?? []).length > 2)) throw new Error('a step joins at most 2 stopped labels');
  const x0 = 76, y0 = 501, x1 = 950, y1 = 161;
  const slope = (y1 - y0) / (x1 - x0);
  const at = (x) => y0 + slope * (x - x0);
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const xs = {
    2: [290, 690],
    3: [220, 500, 780],
    4: [196, 400, 604, 808],
  }[gates.length];
  const sizes = {
    2: [128, 128],
    3: [120, 138, 120],
    4: [112, 112, 112, 112],
  }[gates.length];
  let content = '';
  content += `<g opacity=".55">${line(`M80 551L965 207M80 575L965 231`, palette.line, 1)}${line(xs.map((x) => `M${x} ${Math.round(at(x) - 330)}v${430}`).join(''), palette.grid, 1)}</g>`;
  content += `<path d="M76 512L950 172v28L76 540z" fill="${palette.shadow}"/>`;
  content += `<path d="M76 488L950 148v24L76 512z" fill="${palette.raised}" stroke="${palette.line}"/>`;
  content += line(`M${x0} ${y0}L${x1} ${y1}`, palette.accent, 3);
  // Forward ticks sit between the steps, never under a block.
  const ticks = [x0 + 36, ...xs.slice(0, -1).map((x, i) => (x + xs[i + 1]) / 2), x1 - 26];
  for (const x of ticks) content += forwardTick(x, at(x), palette, angle);
  const labelSize = 32;
  // Stopped branches, labels first so the blocks draw over leader ends.
  const branches = [];
  gates.forEach((gate, index) => {
    const labels = gate.stops ?? [];
    if (labels.length === 0) return;
    const x = xs[index];
    const size = sizes[index];
    const capY = at(x) - size / 2 + (markTop(rects) * size) / 64;
    const last = index === gates.length - 1;
    const widths = labels.map((label) => measure(label, labelSize, faces.mono));
    if (labels.length === 1) {
      // Labels step down 45 units per step from the right so they never share
      // a row. A lone branch leans in from the left, except on the last step
      // where it comes in from the right, as on noctcore/auth.
      const side = last ? 1 : -1;
      const sx = x + side * 76;
      const labelY = Math.max(56 + (gates.length - 1 - index) * 45, capY - 252);
      const lx = Math.min(side < 0 ? sx - widths[0] * 0.5 : sx - widths[0] * 0.35, 1040 - widths[0]);
      const sy = labelY + 31;
      const bend = Math.max(sy + 24, (sy + capY) / 2 - 30);
      const land = bend + 76 * 0.55;
      branches.push(stopped(`M${round(sx)} ${round(sy)}V${round(bend)}L${round(x)} ${round(land)}V${round(capY)}`, x, capY, palette));
      content += lettering(labels[0], lx, labelY, labelSize, palette.stop, faces.mono);
      return;
    }
    // Two causes, one stop: the labels stack and their leaders join into a
    // single branch. They sit on the left of the step when there is room.
    const widest = Math.max(...widths);
    const room = x - 76 - 18 - widest >= 0;
    const side = room ? -1 : 1;
    const jx = x + side * 76;
    const firstY = Math.max(56 + (gates.length - 1 - index) * 45, capY - 270);
    const ys = [firstY, firstY + 46];
    let join = '';
    labels.forEach((label, order) => {
      const ly = ys[order];
      const lx = side < 0 ? jx - 18 - widths[order] : jx + 18;
      content += lettering(label, lx, ly, labelSize, palette.stop, faces.mono);
      const mid = ly - 10;
      const from = side < 0 ? lx + widths[order] + 8 : lx - 8;
      join += `M${round(from)} ${round(mid)}H${round(jx)}`;
    });
    const top = ys[0] - 10;
    const bottom = ys[1] - 10;
    const bend = Math.max(bottom + 30, (bottom + capY) / 2 - 20);
    const land = bend + 76 * 0.55;
    branches.push(line(join + `M${round(jx)} ${round(top)}V${round(bottom)}`, palette.stop, 2, 'stroke-dasharray="5 7"'));
    branches.push(stopped(`M${round(jx)} ${round(bottom)}V${round(bend)}L${round(x)} ${round(land)}V${round(capY)}`, x, capY, palette));
  });
  gates.forEach((gate, index) => {
    content += block(rects, xs[index], at(xs[index]), sizes[index], palette);
  });
  content += branches.join('');
  gates.forEach((gate, index) => {
    const x = xs[index];
    const y = at(x);
    content += line(`M${x} ${round(y + 65)}v39h20`, palette.line, 1);
    content += lettering(gate.name, x - 39, y + 147, 36, palette.foreground, faces.display);
  });
  content += `<circle cx="${x0}" cy="${y0}" r="7" fill="${palette.background}" stroke="${palette.accent}" stroke-width="3"/>`;
  content += `<circle cx="${x1}" cy="${y1}" r="9" fill="${palette.accent}"/>`;
  content += `<circle cx="${x1}" cy="${y1}" r="16" fill="none" stroke="${palette.line}"/>`;
  content += lettering(start, Math.min(51, 196 - measure(start, 26, faces.mono)), 547, 26, palette.foreground, faces.mono);
  const endWidth = measure(end, 26, faces.mono);
  content += lettering(end, Math.min(884, 1040 - endWidth), 117, 26, palette.foreground, faces.mono);
  return content;
}

/*
 * The ribbon: the same passage laid nearly flat across the social preview, so
 * every label stays readable in a card crop. Drawing space 1040 x 230.
 */
export function ribbon(spec, rects, palette) {
  const { gates, start, end } = spec;
  const xs = {
    2: [300, 740],
    3: [165, 510, 855],
    4: [130, 390, 650, 910],
  }[gates.length];
  const sizes = { 2: [108, 108], 3: [100, 116, 100], 4: [96, 96, 96, 96] }[gates.length];
  const y0 = 142, y1 = 92;
  const at = (x) => y0 + ((y1 - y0) * x) / 1040;
  const angle = Math.atan2(y1 - y0, 1040);
  let content = `<path d="M0 151L1040 101v22L0 173z" fill="${palette.shadow}"/>`;
  content += `<path d="M0 134L1040 84v17L0 151z" fill="${palette.raised}" stroke="${palette.line}"/>`;
  content += line('M0 142L1040 92', palette.accent, 3);
  const ticks = [54, ...xs.slice(0, -1).map((x, i) => (x + xs[i + 1]) / 2), 996];
  for (const x of ticks) content += forwardTick(x, at(x), palette, angle);
  const branches = [];
  gates.forEach((gate, index) => {
    const x = xs[index];
    const y = at(x);
    const size = sizes[index];
    const top = y - size / 2 + (markTop(rects) * size) / 64;
    const labels = gate.stops ?? [];
    if (labels.length === 1) {
      content += lettering(labels[0], Math.min(x - 80, 1040 - measure(labels[0], 18, faces.mono)), 12, 18, palette.stop, faces.mono);
      branches.push(stopped(`M${x - 43} 24v18l43 17V${round(top)}`, x, top, palette));
    } else if (labels.length === 2) {
      const widths = labels.map((label) => measure(label, 18, faces.mono));
      const jx = x - 80 + Math.max(...widths) + 14;
      let join = '';
      labels.forEach((label, order) => {
        const ly = 12 + order * 26;
        content += lettering(label, x - 80, ly, 18, palette.stop, faces.mono);
        join += `M${round(x - 80 + widths[order] + 6)} ${ly - 6}H${round(jx)}`;
      });
      branches.push(line(join + `M${round(jx)} 6V32`, palette.stop, 2, 'stroke-dasharray="5 7"'));
      branches.push(stopped(`M${round(jx)} 32V44L${x} 62V${round(top)}`, x, top, palette));
    }
    content += block(rects, x, y, size, palette);
  });
  content += branches.join('');
  gates.forEach((gate, index) => {
    const x = xs[index];
    const y = at(x);
    content += line(`M${x} ${round(y + sizes[index] / 2)}V200`, palette.line);
    content += lettering(String(index + 1).padStart(2, '0'), x - 80, 225, 13, palette.accent, faces.mono);
    content += lettering(gate.name, x - 48, 225, 20, palette.foreground, faces.display);
  });
  content += `<circle cx="0" cy="142" r="6" fill="${palette.background}" stroke="${palette.accent}" stroke-width="2"/>`;
  content += `<circle cx="1040" cy="92" r="8" fill="${palette.accent}"/>`;
  content += lettering(start, -17, 193, 16, palette.secondary, faces.mono);
  content += lettering(end, 1040 - measure(end, 16, faces.mono) + 17, 141, 16, palette.secondary, faces.mono);
  return content;
}

export function lockup(rects, name, x, y, scale, palette) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${mark(rects, 0, 0, 64, palette.accent)}${lettering(name, 72, 47, 43, palette.foreground, faces.display, -0.4)}</g>`;
}

export { tokens };
