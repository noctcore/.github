# noctcore brand

The brand system is **[BRAND.md](BRAND.md)**: colour and type tokens, sizes,
the mark rules and how a banner's mechanism diagram is drawn. Tokens are in
[`tokens.json`](tokens.json) (source) and [`tokens.css`](tokens.css).

## Files

| File | Purpose |
| --- | --- |
| `readme-header-dark.svg` | Org header, 1280 x 360, for a dark surface |
| `readme-header-light.svg` | Org header, 1280 x 360, for a light surface |
| `social-preview.svg` / `.png` | 1280 x 640 social preview (night) |
| `../profile/assets/banner.png` | The org profile banner: the dark header as a 2x PNG |
| `favicon.svg`, `logo-tile.svg`, `logo-mark-transparent.svg`, `png/avatar.png` | The org icons, drawn from the noctcore mark (see Icons) |
| `generator/` | Renders any banner set from a spec (see BRAND.md, Generator), and the icons |
| `specs/` | One spec per banner; `auth.json` rebuilds the noctcore/auth header as a calibration check |

To rebuild the org banner:

```sh
cd brand/generator
pnpm install --ignore-workspace
node render.mjs ../specs/noctcore.json ../out/noctcore
```

then copy `readme-header-*.svg`, `social-preview.*` into `brand/` and
`banner.png` to `profile/assets/banner.png`.

## Icons

`favicon.svg` (64 x 64), `logo-tile.svg` (512 x 512, the mark on the night
field), `logo-mark-transparent.svg` (512 x 512, the mark alone) and
`png/avatar.png` (1024 x 1024, the tile as a PNG, used as the org avatar) are
drawn from the `noctcore` mark. To rebuild them in place:

```sh
cd brand/generator
node icons.mjs
```

The icons use the flat mark: the solid block form muddies at 32 px.
