# CLAUDE.md

CV/portfolio site for Edgar Contreras. Static Astro site, Omarchy/Nord aesthetic, terminal-style UI. Full details in [README.md](README.md).

## Stack
- Astro 4.x, TypeScript, single page (`src/pages/index.astro`)
- Node 22.22.2 (`.nvmrc`), pnpm 11.1.1 (`packageManager` in package.json)
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on push to `main`

## Structure
- `src/data/cv.ts` — all CV content (ES/EN), contact info, tabs config
- `src/lib/icons.ts` — SVG icon defs + skill→icon map
- `src/scripts/app.ts` — render logic, tab switching, console-typing animation, i18n toggle, clock
- `src/pages/index.astro` — page shell + global styles

## Commands
```bash
pnpm install
pnpm dev       # localhost:4321
pnpm build     # outputs dist/
pnpm preview
```

## Gotchas
- `astro.config.mjs` has `base: '/cv-omarchy'` hardcoded for GitHub Pages — remove if deploying to Vercel/Netlify.
- `pnpm-workspace.yaml` sets `onlyBuiltDependencies: [esbuild, sharp]` — required or `pnpm install` fails in CI with `ERR_PNPM_IGNORED_BUILDS`.
- Editing content: almost everything lives in `src/data/cv.ts`, not the `.astro`/`.ts` logic files.
