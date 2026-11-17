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
| `generator/` | Renders any banner set from a spec (see BRAND.md, Generator) |
| `specs/` | One spec per banner; `auth.json` rebuilds the noctcore/auth header as a calibration check |

To rebuild the org banner:

```sh
cd brand/generator
pnpm install --ignore-workspace
node render.mjs ../specs/noctcore.json ../out/noctcore
```

then copy `readme-header-*.svg`, `social-preview.*` into `brand/` and
`banner.png` to `profile/assets/banner.png`.

## Legacy files

`logo-tile.svg`, `logo-mark-transparent.svg`, `favicon.svg` and
`png/avatar.png` are the previous avatar set. They stay in use until an avatar
is drawn in the blueprint language.
