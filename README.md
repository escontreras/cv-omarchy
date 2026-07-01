# CV / Portafolio — Edgar Contreras

Sitio web estático de CV con estética **Omarchy** (tema **Nord**, tipografía **Fira Code**),
construido con **Astro**. Terminal interactiva: tabs que cambian de sección con animación de
consola (tecleo del comando + spinner braille), reloj en vivo, toggle de idioma ES/EN
(se recuerda en `localStorage`) y descarga del CV en PDF.

## Requisitos

- **Node.js 22.22.2** (hay un `.nvmrc`: con nvm basta `nvm use`)
- **pnpm 11.1.1** (`corepack enable && corepack prepare pnpm@11.1.1 --activate`)

## Desarrollo local

```bash
pnpm install     # instala dependencias
pnpm dev         # servidor de desarrollo en http://localhost:4321
```

## Build de producción

```bash
pnpm build       # genera el sitio estático en dist/
pnpm preview     # previsualiza el build localmente
```

## Estructura del proyecto

```
astro-portfolio/
├── public/
│   └── Edgar_Contreras_CV.pdf     # PDF descargable (servido tal cual)
├── src/
│   ├── data/
│   │   └── cv.ts                  # 🔧 TODO tu contenido (ES/EN): resumen, skills, experiencia…
│   ├── lib/
│   │   └── icons.ts               # iconos de línea (SVG) + mapa tecnología→icono
│   ├── scripts/
│   │   └── app.ts                 # lógica: render, tabs, animación de consola, idioma, reloj
│   └── pages/
│       └── index.astro            # página + estilos globales + fuente
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Cómo editar el contenido

Casi todo vive en **`src/data/cv.ts`**:

- **`CONTACT`** — nombre, email, LinkedIn, teléfono, ubicación y nombre del archivo PDF.
- **`CV.es` / `CV.en`** — resumen, grupos de habilidades, experiencia, educación, certificaciones e idiomas en cada idioma.
- **`TABS`** — las secciones y el comando que se "teclea" en cada una.

Para **cambiar el CV en PDF**, reemplaza `public/Edgar_Contreras_CV.pdf` (mismo nombre) o
actualiza `CONTACT.cvFile`.

Para **añadir el icono de una tecnología nueva**, agrega la ruta SVG en `DEFS` y su
asignación en `SKILL_MAP` dentro de `src/lib/icons.ts`.

## Subir a un repositorio (GitHub)

Desde la carpeta `astro-portfolio/`:

```bash
git init
git add .
git commit -m "CV web con Astro — estética Omarchy"
git branch -M main
git remote add origin https://github.com/escontreras/cv-omarchy.git
git push -u origin main
```

## Despliegue con GitHub Pages + GitHub Actions

Ya viene incluido el workflow **`.github/workflows/deploy.yml`**, que en cada push a `main`:
instala pnpm 11.1.1 → usa Node 22.22.2 → `pnpm install` → `pnpm build` → publica `dist/` en Pages.

Pasos para activarlo (una sola vez):

1. Sube el proyecto a GitHub (pasos de arriba). El `astro.config.mjs` ya está configurado
   para `github.com/escontreras/cv-omarchy` (`site: 'https://escontreras.github.io'`, `base: '/cv-omarchy'`).
2. En GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Cada push a `main` despliega solo. Verás el progreso en la pestaña **Actions** y el sitio quedará en
   **https://escontreras.github.io/cv-omarchy**.

> Consejo: corre `pnpm install` una vez en local y **commitea el `pnpm-lock.yaml`** para builds
> reproducibles.

### Alternativa — Vercel o Netlify (cero configuración)

Conecta el repositorio en [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com).
Detectan Astro automáticamente (build: `pnpm build`, salida: `dist/`). Con estas plataformas puedes
borrar `base` de `astro.config.mjs`.

---

Diseño y contenido © Edgar Contreras. Estética inspirada en [Omarchy](https://omarchy.org).
