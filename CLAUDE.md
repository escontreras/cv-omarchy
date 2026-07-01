# CLAUDE.md

CV/portfolio site for Edgar Contreras. Static Astro site, Omarchy/Nord aesthetic, terminal-style UI. Full details in [README.md](README.md).

## Stack
- Astro 4.x, TypeScript, Tailwind CSS (Nord palette in `tailwind.config.mjs`), single page (`src/pages/index.astro`)
- Node 22.22.2 (`.nvmrc`), pnpm 11.1.1 (`packageManager` in package.json)
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on push to `main`

## Structure
- `src/data/cv.ts` — all CV content (ES/EN), contact info, tabs config
- `src/lib/icons.ts` — SVG icon defs + skill→icon map
- `src/components/` — Astro components (`TopBar`, `ProfileHeader`, `TabsNav`, `CommandLine`, `Terminal`, `CvApp`) plus `panels/` (one per tab: Resumen, Skills, Experience, Education, Contact)
- `src/scripts/app.ts` — small client script: tab/lang state, typing animation, clock. Does NOT build HTML — it only toggles CSS classes/attributes on nodes Astro already rendered
- `src/pages/index.astro` — page shell, global styles, `<CvApp />`, i18n CSS (`[data-i18n]` attribute selectors keyed off `html[data-lang]`)

Content for **both languages is pre-rendered as static HTML** at build time (see `panels/*.astro`, looped once per lang in `Terminal.astro`). Switching language/tab client-side just toggles which pre-rendered block is visible — nothing is built at runtime. Bilingual small strings (labels, status text) use `data-i18n="es"|"en"` spans + a CSS rule in `index.astro`; only tab-dependent bits (typed command, spinner) are set via `textContent` in `app.ts`.

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
- Adding a new panel/tab: needs an entry in `TABS` (`cv.ts`), a new `panels/*.astro`, and wiring it into `Terminal.astro`'s lang loop — `TabsNav.astro`/`TopBar.astro` already derive buttons from `TABS` automatically.
