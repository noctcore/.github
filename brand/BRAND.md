# noctcore brand: blueprint

Every noctcore banner is a technical drawing of the thing the product does.
A deep night field with a quiet grid, a steel-blue mark beside the name, one
plain sentence of promise, and on the right the product's real mechanism drawn
as a line with blocks on it. What the product stops is labelled in salmon
copper on dotted leaders. Nothing is decoration: if a shape is on the banner,
it stands for a step the code takes.

The language comes from the `noctcore/auth` identity ("Open passage") and is
shared by `noctcore/harness` ("Held run"). This document turns it into rules
so that every repo in the family can be drawn the same way.

## Colour

Hex sRGB is the source of truth. The values are taken from the auth brand
source (`assets/brand/design.mjs`), not sampled from images; OKLCH is
calculated from the hex. Night is the lead expression. Paper is the daytime
reading surface for light mode. Machine-readable copies: `tokens.json`
(source) and `tokens.css` (generated from it).

| Token | Night | Paper | Role |
| --- | --- | --- | --- |
| `background` | `#17212D` | `#F6F5F1` | The field |
| `foreground` | `#F0F3F6` | `#202B39` | Ink: wordmark, headline, step names |
| `accent` | `#AAC8E2` | `#355E87` | Steel blue: mark, route line, block faces, forward ticks |
| `secondary` | `#B3BEC9` | `#596773` | Muted ink: subline, secondary labels |
| `stop` | `#D9A08E` | `#92513E` | Salmon copper: stopped branches and their labels, nothing else |
| `line` | `#405367` | `#B9C6D0` | Construction lines, leaders to step names |
| `grid` | `#253344` | `#E3E6E6` | Grid lines, always drawn at 48% opacity |
| `raised` | `#202F40` | `#EDF0F1` | The raised bed the route runs on |
| `side` | `#2C4055` | `#CCD8E1` | Side faces of a block |
| `shadow` | `#101924` | `#DDE2E4` | Depth plane under the bed |

OKLCH of the text colours, night then paper: background
`oklch(0.244 0.027 253.4)` / `oklch(0.970 0.005 95.1)`, foreground
`oklch(0.963 0.005 247.9)` / `oklch(0.285 0.030 254.7)`, accent
`oklch(0.819 0.049 244.6)` / `oklch(0.471 0.081 249.9)`, secondary
`oklch(0.796 0.020 248.1)` / `oklch(0.506 0.026 244.2)`, stop
`oklch(0.755 0.073 38.3)` / `oklch(0.507 0.092 37.1)`. Full precision is in
`tokens.json`.

Text contrast (WCAG relative luminance): on night, foreground 14.60:1, accent
9.34:1, secondary 8.61:1, stop 7.25:1; on paper, foreground 13.13:1, accent
6.20:1, secondary 5.33:1, stop 5.55:1. Every text pairing clears 4.5:1,
including the small mono labels. `line`, `grid`, `raised`, `side` and
`shadow` are construction colours: never use them for text.

Colour is never the only signal. The route is continuous with forward ticks;
a stopped branch is dashed and ends in a perpendicular cap. Keep both line
styles when recolouring.

## Type

| Use | Face | Weight | Size in a README header |
| --- | --- | --- | --- |
| Wordmark | Manrope | 600 | 38.7 px (43 at 0.9 scale), tracking -0.4 |
| Headline | Manrope | 600 | 54 px, tracking -1.3 |
| Subline | Manrope | 550 | 23 px |
| Step names | Manrope | 600 | 36 units in the diagram (about 17.6 px) |
| Annotations, endpoints, eyebrow | DM Mono | 400 | 32 and 26 units in the diagram (about 15.7 and 12.7 px); eyebrow 13 px, tracking 1.1, uppercase |

- **Manrope**, variable TTF, copyright 2018 The Manrope Project Authors,
  [Google Fonts, pinned revision](https://github.com/google/fonts/blob/b31870aff700ab7a1d74fa0c6887d95beb9e0037/ofl/manrope/Manrope%5Bwght%5D.ttf).
- **DM Mono** Regular, copyright 2020 The DM Mono Project Authors,
  [Google Fonts, pinned revision](https://github.com/google/fonts/blob/986a8089ce76db1064d1baf745dcde8cde756f45/ofl/dmmono/DMMono-Regular.ttf).

Both use the SIL Open Font License 1.1; the full notices are in
`generator/licenses/` and the unmodified binaries in `generator/fonts/`. The
fonts are source material only: every rendered SVG has its lettering converted
to paths, so a banner loads no fonts.

The wordmark is always `noctcore/<repo>` in lowercase, matching the GitHub
path; the org itself is `noctcore`. The wordmark is ink, never copper.

## Grid, spacing and sizes

- The field carries a 40 px grid (1 px `grid` lines at 48% opacity).
- Text column starts at x = 88 (lockup, headline) and x = 90 (subline). The
  lockup sits at y = 56; the headline baseline is y = 207 and the subline
  baseline y = 256. The headline stays under 620 px wide, the subline under
  615 px; the generator refuses longer copy.
- The diagram occupies the right side at `translate(690 10) scale(.49)` of a
  1040 x 640 drawing space.

| Asset | Size | Notes |
| --- | --- | --- |
| README header | 1280 x 360 | Light and dark SVG; PNG exported at 2x (2560 x 720). Checked at 830 px wide, about GitHub's reading width. |
| Social preview | 1280 x 640 | Night only, PNG under 1 MB. Essential content inside x = 100..1176, y = 76..560. Uses the flat ribbon form of the diagram. |
| Org profile banner | 1280 x 360 | The org's README header in night, exported as a 2x PNG at `profile/assets/banner.png`. A profile README shows one image, so it uses night, the lead expression. |

## Marks

Each repo has its own mark, built from the same parts: a 64 unit canvas, the
occupied area x = 12..52 and y = 12..52, an exact four unit grid, eight unit
strokes, square corners, and a visible eight unit core square. The shape
around the core says what the product does to it. Marks are stored as lists
of rectangles in `generator/brand.mjs`, so the solid block form is derived,
not redrawn.

| Mark | Shape | Meaning |
| --- | --- | --- |
| `noctcore` | Closed above and below, open left and right at the core | Held passage: work passes through, nothing passes around |
| `auth` | Two offset open corners | Open passage: a login passes through its boundaries |
| `harness` | Two brackets | Held run: a repo held to its own rules |
| `nightcore` (draft) | An arch over the core | One policy spans the work |
| `nysia` (draft) | A terminal frame with its title bar lifted off, the core as the cursor | The window detaches; the terminal stays |
| `eslint-plugins` | Lines of code, one token held apart and underlined | A report that points at the exact place |
| `showcase-kit` | Four corners | A viewfinder framing the capture |

The `nightcore` and `nysia` marks and their banner specs are drafts kept for
later; neither repo has adopted them, and their app icons are unchanged.

No checkmarks, padlocks, shields, moons or stars. Keep marks upright and
unrotated, and do not round their corners.

## The diagram

A banner's diagram is a **passage**: the product's real path, drawn once.

- **Angle.** One straight route rising left to right, 874 units across for 340
  up (about 21.3 degrees), on a raised bed with a depth plane below and two
  faint parallel construction lines. It is an oblique projection, not true
  isometric: blocks face the viewer and extrude straight down.
- **Route.** 3 unit `accent` line, an open circle at the start, a filled dot
  with a hairline ring at the end, and open chevron ticks between the blocks
  pointing forward. Endpoints carry mono labels: where work comes from and
  where it lands.
- **Blocks.** 2 to 4 steps, each drawn as the repo's own mark made solid:
  `side` faces 7 units deep, an `accent` face, a 0.55 unit `foreground`
  hairline on the upper edges. With three steps the middle block is larger
  (138 against 120). No other block shapes, no icons inside blocks.
- **Step names.** Manrope 600 under each block, hung from a thin `line` leader
  that drops and turns right. A step name is the product's own word for the
  step.
- **Stopped branches.** At most 3 labels per diagram, at most 2 per step.
  A label is DM Mono in `stop`, above the route; its dotted leader (2 unit,
  dash 5 7) drops, bends once toward the block and ends on the block's top
  edge in a perpendicular cap with a dot. A lone branch leans in from the
  left, or from the right on the last step. Two causes stopped by one step
  stack their labels and join into one leader.
- **The social preview** lays the same passage nearly flat (the ribbon), with
  labels along the top and numbered step names along the bottom.

A diagram must show a flow the product really runs, in its real order, with
names a reader can find in the README or the code. Annotations name what that
step really stops or removes. If the product does not stop anything at a
step, leave the step without a label rather than invent one.

`noctcore/harness` uses a second form, the **ledger**: one spine, one track
per check, each ending in a verdict. Use it when the product's output is a
list of results rather than a path. It follows every rule above except the
angle: passing tracks are continuous `accent` lines with forward ticks that
land on a core square, stopped ones are dashed `stop` lines with a cap.

## Dos and don'ts

Do:

- write the headline as a plain promise the product keeps ("Nothing merges on
  trust."), one sentence, ending with a full stop;
- take every step name and annotation from the product's own README or code;
- keep the field flat: solid colours, solid depth planes, hairlines;
- keep alt text that says the whole diagram in a sentence.

Don't:

- use gradients, glows, blur, noise, stars, moons or embedded raster images;
- add a block, arrow or label that stands for nothing;
- tint the wordmark or headline copper; copper only marks what is stopped;
- go past 3 annotations or 4 steps; split the idea instead;
- use em or en dashes anywhere in copy or labels;
- claim more than the product does (a stopped branch is an example of a class
  the step addresses, not a promise to catch every instance).

## Generator

`generator/` renders a whole banner set from a JSON spec. Requires Node 22 and
the two pinned dependencies (`@resvg/resvg-js` 2.6.2, `fontkit` 2.0.4).

```sh
cd brand/generator
pnpm install              # or npm install
node render.mjs ../specs/nightcore.json ../out/nightcore
node build.mjs            # every spec in ../specs, plus a mark sheet
```

A spec:

```json
{
  "name": "noctcore/nightcore",
  "mark": "nightcore",
  "headline": "Nothing merges on trust.",
  "subline": "Agents plan, build and verify under a policy you set.",
  "eyebrow": "RUST / TAURI / OPEN SOURCE",
  "alt": "noctcore/nightcore. Nothing merges on trust. ...",
  "description": "One or two sentences for the SVG desc: the whole diagram in words.",
  "diagram": {
    "start": "worktree",
    "end": "your branch",
    "gates": [
      { "name": "guardrails", "stops": ["skipped test"] },
      { "name": "structure-lock", "stops": ["cross-layer import"] },
      { "name": "reviewer agent", "stops": ["FAIL verdict"] }
    ]
  }
}
```

`mark` is a key of `marks` in `brand.mjs` or an inline list of
`[x, y, width, height]` rectangles. Add `"profile": true` to also write the
2x `banner.png`. The output is `readme-header-dark.svg`,
`readme-header-light.svg`, their 2x PNGs, `social-preview.svg` and
`social-preview.png`. The generator refuses em and en dashes, too many steps
or annotations, and copy that would run into the diagram. Rasters render
from the outlined SVGs with system fonts disabled, so the PNGs never depend
on the machine's fonts.

README snippet:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand/readme-header-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/brand/readme-header-light.svg">
  <img src="assets/brand/readme-header-light.svg" width="1280" height="360" alt="(the spec's alt)">
</picture>
```

GitHub's social preview is uploaded by hand in Settings, General, Social
preview; there is no API for it.
