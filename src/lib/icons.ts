// Iconos de línea estilo Lucide, generados como cadenas SVG (mismo lenguaje visual de Omarchy).

type ChildEl = string | { t: string; a: Record<string, string | number> };

function build(children: ChildEl[], size = 14): string {
  const inner = children
    .map((c) => {
      if (typeof c === 'string') return `<path d="${c}"/>`;
      const attrs = Object.entries(c.a)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${c.t} ${attrs}/>`;
    })
    .join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">${inner}</svg>`;
}

const c = (a: Record<string, string | number>): ChildEl => ({ t: 'circle', a });
const r = (a: Record<string, string | number>): ChildEl => ({ t: 'rect', a });
const e = (a: Record<string, string | number>): ChildEl => ({ t: 'ellipse', a });
const l = (a: Record<string, string | number>): ChildEl => ({ t: 'line', a });

// --- Iconos de interfaz (tabs, waybar, contacto) ---
export const UI = {
  resumen: build(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8']),
  skills: build(['m16 18 6-6-6-6', 'm8 6-6 6 6 6']),
  exp: build([r({ width: 20, height: 14, x: 2, y: 7, rx: 2 }), 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16']),
  edu: build(['M22 10v6', 'm2 10 10-5 10 5-10 5z', 'M6 12v5c3 3 9 3 12 0v-5']),
  contact: build([c({ cx: 12, cy: 12, r: 4 }), 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8']),
  code: build(['m16 18 6-6-6-6', 'm8 6-6 6 6 6']),
  award: build([c({ cx: 12, cy: 8, r: 6 }), 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11']),
  globe: build([c({ cx: 12, cy: 12, r: 10 }), 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z']),
  mail: build([r({ width: 20, height: 16, x: 2, y: 4, rx: 2 }), 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7']),
  link: build(['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6']),
  whatsapp: build(['M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z', 'M15.5 13.5c-.4-.2-1-.5-1.3-.6-.3-.1-.5 0-.7.3-.2.3-.5.6-.7.7-.2.1-.3.1-.6 0-1.2-.6-2-1.4-2.6-2.5-.1-.2 0-.4.1-.5.1-.1.3-.3.4-.5.1-.2 0-.4 0-.5-.1-.3-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.5.1-.7.3-.7.7-.8 1.6-.5 2.6.5 1.6 1.6 2.9 3.1 3.8 1.3.8 2.3 1 3 .9.5-.1 1.2-.5 1.4-1 .2-.4.2-.8.1-.9-.1-.1-.2-.1-.5-.2z']),
  phone: build(['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z']),
  pin: build(['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', c({ cx: 12, cy: 10, r: 3 })]),
  download: build(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'], 13),
  downloadBig: build(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'], 15),
  wifi: build(['M5 13a10 10 0 0 1 14 0', 'M8.5 16.5a5 5 0 0 1 7 0', 'M2 8.82a15 15 0 0 1 20 0', l({ x1: 12, y1: 20, x2: 12.01, y2: 20 })], 15),
  vol: build(['M11 5 6 9H2v6h4l5 4z', 'M15.54 8.46a5 5 0 0 1 0 7.07'], 15),
  batt: build([r({ width: 16, height: 10, x: 2, y: 7, rx: 2 }), l({ x1: 22, y1: 11, x2: 22, y2: 13 }), r({ width: 9, height: 6, x: 4, y: 9, rx: 1, fill: 'currentColor', stroke: 'none' })], 16),
};

// --- Iconos por tecnología ---
const DEFS: Record<string, ChildEl[]> = {
  atom: [c({ cx: 12, cy: 12, r: 1 }), 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
  smartphone: [r({ width: 14, height: 20, x: 5, y: 2, rx: 2 }), l({ x1: 12, y1: 18, x2: 12.01, y2: 18 })],
  triangle: ['M13.73 4a2 2 0 0 0-3.46 0L2.5 18a2 2 0 0 0 1.73 3h15.54a2 2 0 0 0 1.73-3z'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm6.08 9.5-3.49 1.59a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59', 'm6.08 14.5-3.49 1.59a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59'],
  database: [e({ cx: 12, cy: 5, rx: 9, ry: 3 }), 'M3 5V19A9 3 0 0 0 21 19V5', 'M3 12A9 3 0 0 0 21 12'],
  braces: ['M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1', 'M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1'],
  code: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'],
  grid: [r({ width: 7, height: 7, x: 3, y: 3, rx: 1 }), r({ width: 7, height: 7, x: 14, y: 3, rx: 1 }), r({ width: 7, height: 7, x: 14, y: 14, rx: 1 }), r({ width: 7, height: 7, x: 3, y: 14, rx: 1 })],
  gitMerge: [c({ cx: 18, cy: 18, r: 3 }), c({ cx: 6, cy: 6, r: 3 }), 'M6 21V9a9 9 0 0 0 9 9'],
  check: ['M18 6 7 17l-5-5', 'm22 10-7.5 7.5L13 16'],
  sparkles: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z'],
  terminal: ['m4 17 6-6-6-6', 'M12 19h8'],
  pointer: ['M12.586 12.586 19 19', 'M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z'],
  message: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  zap: ['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'],
  gitBranch: [l({ x1: 6, y1: 3, x2: 6, y2: 15 }), c({ cx: 18, cy: 6, r: 3 }), c({ cx: 6, cy: 18, r: 3 }), 'M18 9a9 9 0 0 1-9 9'],
  play: ['m6 3 14 9-14 9z'],
  video: ['m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.94a.5.5 0 0 0-.78-.42L16 11', r({ width: 14, height: 12, x: 2, y: 6, rx: 2 })],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  palette: ['M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z', c({ cx: 13.5, cy: 6.5, r: 0.6, fill: 'currentColor', stroke: 'none' }), c({ cx: 17.5, cy: 10.5, r: 0.6, fill: 'currentColor', stroke: 'none' }), c({ cx: 6.5, cy: 12.5, r: 0.6, fill: 'currentColor', stroke: 'none' }), c({ cx: 8.5, cy: 7.5, r: 0.6, fill: 'currentColor', stroke: 'none' })],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  shieldCheck: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'],
  flask: ['M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2', 'M6.453 15h11.094', 'M8.5 2h7'],
  penTool: ['M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z', 'm18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207l3.082 13.026a1 1 0 0 0 .776.746L13 18', 'm2.3 2.3 7.286 7.286', c({ cx: 11, cy: 11, r: 2 })],
  sailboat: ['M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z', 'M21 14 10 2 3 14h18Z', 'M10 2v16'],
  appWindow: [r({ width: 20, height: 16, x: 2, y: 4, rx: 2 }), 'M10 4v4', 'M2 8h20', 'M6 4v4'],
  dot: [c({ cx: 12, cy: 12, r: 3 })],
};

const SKILL_MAP: Record<string, string> = {
  'React.js': 'atom', 'React Native (Expo)': 'smartphone', 'Next.js': 'triangle', 'NativeWind': 'palette', 'Tailwind CSS': 'wind', 'Redux': 'layers', 'Zustand': 'box', 'TanStack Query': 'database', 'Zod': 'shieldCheck',
  'TypeScript': 'braces', 'JavaScript (ES6+)': 'code', 'Micro-Frontends': 'grid', 'CI/CD': 'gitMerge', 'Jest': 'flask',
  'Claude Projects': 'sparkles', 'Claude Code': 'terminal', 'Claude Design': 'penTool', 'Windsurf': 'sailboat', 'Cursor': 'pointer', 'Prompt Engineering': 'message', 'Automatización': 'zap', 'Automation': 'zap',
  'Git / GitHub': 'gitBranch', 'App Store Connect': 'appWindow', 'Google Play Console': 'play', 'Agora SDK': 'video', 'Firebase': 'flame',
};

export function skillIcon(name: string): string {
  return build(DEFS[SKILL_MAP[name] ?? 'dot'], 13);
}
