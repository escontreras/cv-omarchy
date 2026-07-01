import { CV, CONTACT, TABS, type Lang } from '../data/cv';
import { UI, skillIcon } from '../lib/icons';

// --- Estado ---
type State = {
  lang: Lang;
  tab: string;
  displayCmd: string;
  typing: boolean;
  panelReady: boolean;
  spin: number;
  clock: string;
};

const state: State = {
  lang: 'es',
  tab: 'resumen',
  displayCmd: '',
  typing: false,
  panelReady: false,
  spin: 0,
};

let typeTimer: number | undefined;
let spinTimer: number | undefined;
let readyTimer: number | undefined;
let clockTimer: number | undefined;

const SPIN = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function set(patch: Partial<State>): void {
  Object.assign(state, patch);
  render();
}

function clearSeq(): void {
  if (typeTimer) clearInterval(typeTimer);
  if (spinTimer) clearInterval(spinTimer);
  if (readyTimer) clearTimeout(readyTimer);
  typeTimer = spinTimer = readyTimer = undefined;
}

function runTab(id: string): void {
  clearSeq();
  const meta = TABS.find((t) => t.id === id) ?? TABS[0];
  const full = meta.cmd[state.lang];
  set({ tab: id, displayCmd: '', typing: true, panelReady: false, spin: 0 });
  let i = 0;
  typeTimer = window.setInterval(() => {
    i++;
    set({ displayCmd: full.slice(0, i) });
    if (i >= full.length) {
      if (typeTimer) clearInterval(typeTimer);
      typeTimer = undefined;
      set({ typing: false });
      readyTimer = window.setTimeout(() => {
        if (spinTimer) clearInterval(spinTimer);
        spinTimer = undefined;
        set({ panelReady: true });
      }, 240);
    }
  }, 40);
  spinTimer = window.setInterval(() => set({ spin: (state.spin + 1) % 10 }), 90);
}

function toggleLang(): void {
  const l: Lang = state.lang === 'es' ? 'en' : 'es';
  try {
    localStorage.setItem('cv_lang', l);
  } catch {
    /* ignore */
  }
  state.lang = l;
  runTab(state.tab);
}

// --- Vistas de los paneles ---
function panelResumen(d: typeof CV['es']): string {
  return `<div style="border-left:2px solid #5e81ac;padding:4px 0 4px 18px;max-width:760px;text-wrap:pretty">${esc(d.resumen)}</div>`;
}

function panelSkills(d: typeof CV['es']): string {
  const groups = d.skillGroups
    .map(
      (g) => `
      <div>
        <div style="color:#88c0d0;font-weight:600;font-size:13px;margin-bottom:10px;display:flex;align-items:center;gap:7px">${UI.code}${esc(g.label)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:7px">
          ${g.items
            .map(
              (it) =>
                `<span style="display:inline-flex;align-items:center;gap:7px;background:#3b4252;border:1px solid #434c5e;border-radius:7px;padding:5px 11px;font-size:12.5px;color:#d8dee9"><span style="color:#81a1c1">${skillIcon(it)}</span>${esc(it)}</span>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('');
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:22px">${groups}</div>`;
}

function panelExp(d: typeof CV['es']): string {
  const jobs = d.jobs
    .map(
      (job) => `
      <div style="position:relative">
        <span style="position:absolute;left:-29px;top:5px;width:11px;height:11px;border-radius:50%;background:#2e3440;border:2px solid #88c0d0"></span>
        <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px">
          <span style="color:#88c0d0;font-weight:600;font-size:15px">${esc(job.role)}</span>
          <span style="color:#81a1c1">@ ${esc(job.company)}</span>
          <span style="flex:1"></span>
          <span style="color:#ebcb8b;font-size:12.5px">${esc(job.dates)}</span>
        </div>
        <div style="color:#616e88;font-size:12.5px;margin:2px 0 10px">${esc(job.location)}</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          ${job.bullets
            .map(
              (b) =>
                `<div style="display:flex;gap:10px;max-width:760px"><span style="color:#b48ead">›</span><span style="text-wrap:pretty">${esc(b)}</span></div>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('');
  return `<div style="display:flex;flex-direction:column;gap:26px;border-left:2px solid #434c5e;padding-left:22px">${jobs}</div>`;
}

function panelEdu(d: typeof CV['es']): string {
  return `
    <div style="display:flex;flex-direction:column;gap:22px">
      <div style="background:#3b4252;border:1px solid #434c5e;border-radius:10px;padding:16px 18px;max-width:620px">
        <div style="color:#88c0d0;font-weight:600;font-size:15px">${esc(d.edu.degree)}</div>
        <div style="color:#e5e9f0;margin-top:3px">${esc(d.edu.school)}</div>
        <div style="color:#616e88;font-size:12.5px;margin-top:4px">${esc(d.edu.location)} · ${esc(d.edu.dates)}</div>
      </div>
      <div>
        <div style="color:#88c0d0;font-weight:600;font-size:13px;margin-bottom:10px;display:flex;align-items:center;gap:7px">${UI.award}${esc(d.certsLabel)}</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          ${d.certs.map((ct) => `<div style="display:flex;gap:10px"><span style="color:#a3be8c">✓</span><span>${esc(ct)}</span></div>`).join('')}
        </div>
      </div>
      <div>
        <div style="color:#88c0d0;font-weight:600;font-size:13px;margin-bottom:8px;display:flex;align-items:center;gap:7px">${UI.globe}${esc(d.langsLabel)}</div>
        <div style="color:#d8dee9">${esc(d.langsLine)}</div>
      </div>
    </div>`;
}

function panelContact(d: typeof CV['es']): string {
  const row = (icon: string, label: string, value: string) =>
    `<div style="display:flex;gap:12px;align-items:baseline"><span style="color:#b48ead;min-width:92px;display:inline-flex;align-items:center;gap:8px">${icon}${label}</span>${value}</div>`;
  return `
    <div style="display:flex;flex-direction:column;gap:14px;max-width:620px">
      ${row(UI.mail, 'email', `<a href="mailto:${CONTACT.email}" style="color:#8fbcbb;text-decoration:none">${CONTACT.email}</a>`)}
      ${row(UI.link, 'linkedin', `<a href="${CONTACT.linkedinUrl}" target="_blank" rel="noopener" style="color:#8fbcbb;text-decoration:none">${CONTACT.linkedin}</a>`)}
      ${row(UI.phone, 'phone', `<span style="color:#d8dee9">${CONTACT.phone}</span>`)}
      ${row(UI.whatsapp, 'whatsapp', `<a href="${CONTACT.whatsappUrl}" target="_blank" rel="noopener" style="color:#8fbcbb;text-decoration:none">${CONTACT.whatsapp}</a>`)}
      ${row(UI.pin, 'location', `<span style="color:#d8dee9">${CONTACT.location}</span>`)}
      <a href="${CONTACT.cvFile}" download style="margin-top:12px;display:inline-flex;align-items:center;gap:10px;align-self:flex-start;background:#88c0d0;color:#2e3440;font-weight:600;font-size:13.5px;border-radius:9px;padding:10px 18px;text-decoration:none">${UI.downloadBig}<span>${esc(d.downloadLabel)}</span></a>
    </div>`;
}

function panelFor(tab: string, d: typeof CV['es']): string {
  switch (tab) {
    case 'skills': return panelSkills(d);
    case 'exp': return panelExp(d);
    case 'edu': return panelEdu(d);
    case 'contact': return panelContact(d);
    default: return panelResumen(d);
  }
}

// --- Render principal ---
function render(): void {
  const app = document.getElementById('app');
  if (!app) return;
  const { lang, tab } = state;
  const d = CV[lang];
  const cur = TABS.find((t) => t.id === tab) ?? TABS[0];
  const ready = state.panelReady;

  const tabIcons: Record<string, string> = { resumen: UI.resumen, skills: UI.skills, exp: UI.exp, edu: UI.edu, contact: UI.contact };
  const tabBtnBase =
    'display:inline-flex;align-items:center;gap:7px;font-family:inherit;border-radius:8px;cursor:pointer;transition:filter .15s;';
  const tabsHtml = TABS.map((t) => {
    const active = t.id === tab;
    const st = tabBtnBase + (active
      ? 'background:#88c0d0;color:#2e3440;border:1px solid #88c0d0;font-weight:600;'
      : 'background:transparent;color:#81a1c1;border:1px solid #434c5e;');
    return `<button data-action="tab:${t.id}" class="tab-btn" style="${st}">${tabIcons[t.id]}${esc(t[lang])}</button>`;
  }).join('');

  const wsBase =
    'font-family:inherit;font-size:12px;width:22px;height:22px;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:filter .15s;';
  const wsHtml = TABS.map((t, i) => {
    const active = t.id === tab;
    const st = wsBase + (active
      ? 'background:#88c0d0;color:#2e3440;border:1px solid #88c0d0;font-weight:600;'
      : 'background:transparent;color:#4c566a;border:1px solid #3b4252;');
    return `<button data-action="tab:${t.id}" style="${st}">${i + 1}</button>`;
  }).join('');

  const on = 'color:#88c0d0;font-weight:600';
  const off = 'color:#4c566a';
  const loadingMsg = (lang === 'es' ? 'cargando ' : 'loading ') + cur[lang] + '…';
  const availLabel = lang === 'es' ? 'Disponible para proyectos' : 'Available for work';

  app.innerHTML = `
  <div style="min-height:100vh;width:100%;background:radial-gradient(120% 90% at 28% -10%,#3b4252 0%,#2e3440 52%,#272c36 100%);display:flex;flex-direction:column;align-items:center">

    <div class="topbar" style="position:sticky;top:0;z-index:20;width:100%;display:flex;align-items:center;gap:12px;background:rgba(46,52,64,.72);backdrop-filter:blur(10px);border-bottom:1px solid #3b4252;font-size:12.5px;color:#d8dee9">
      <div style="display:flex;align-items:center;gap:8px;font-weight:600;color:#88c0d0"><span style="font-size:14px">❄</span><span style="letter-spacing:.04em">omarchy</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-left:4px">${wsHtml}</div>
      <div style="flex:1"></div>
      <span style="color:#616e88">[${esc(cur[lang])}]</span>
      <div style="flex:1"></div>
      <button data-action="lang" style="display:inline-flex;align-items:center;gap:6px;background:#3b4252;border:1px solid #434c5e;border-radius:999px;padding:3px 10px;color:#d8dee9;font-family:inherit;font-size:12px;cursor:pointer">
        <span style="${lang === 'es' ? on : off}">ES</span><span style="color:#4c566a">/</span><span style="${lang === 'en' ? on : off}">EN</span>
      </button>
      <span class="topbar-status" style="align-items:center;gap:6px;color:#a3be8c"><span style="width:7px;height:7px;border-radius:50%;background:#a3be8c;display:inline-block"></span>${lang === 'es' ? 'ES · nativo' : 'EN · B1'}</span>
      <span class="topbar-icons" style="align-items:center;gap:11px;color:#81a1c1">${UI.wifi}${UI.vol}${UI.batt}</span>
      <span style="color:#ebcb8b;min-width:70px;text-align:right">${state.clock}</span>
    </div>

    <div class="terminal-shell" style="width:100%;max-width:1000px;background:#2e3440;border:1px solid #434c5e;box-shadow:0 30px 80px -24px rgba(0,0,0,.6),0 0 0 1px rgba(136,192,208,.05);overflow:hidden">

      <div style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:#3b4252;border-bottom:1px solid #434c5e">
        <div style="display:flex;gap:8px">
          <span style="width:12px;height:12px;border-radius:50%;background:#bf616a"></span>
          <span style="width:12px;height:12px;border-radius:50%;background:#ebcb8b"></span>
          <span style="width:12px;height:12px;border-radius:50%;background:#a3be8c"></span>
        </div>
        <div style="flex:1;text-align:center;font-size:12.5px;color:#81a1c1">edgar@omarchy: ~/cv — fish</div>
      </div>

      <div class="term-body">

        <div class="profile-row" style="display:flex;flex-wrap:wrap;align-items:flex-start;padding-bottom:22px;border-bottom:1px dashed #434c5e">
          <pre class="ascii-art" style="margin:0;color:#88c0d0;font-size:12.5px;line-height:1.5;font-weight:600;opacity:.9">  ❄ ❄ ❄
╓─────────╖
║  E · C  ║
║ ~/dev   ║
╙─────────╜</pre>
          <div class="profile-info" style="flex:1;display:flex;flex-direction:column;gap:15px">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px">
              <div style="flex:1;min-width:210px">
                <div class="profile-name" style="color:#eceff4;font-weight:600;letter-spacing:.01em">${CONTACT.name}</div>
                <div style="color:#81a1c1;font-size:13.5px;margin-top:4px">${esc(d.role)} · ${esc(d.exp)}</div>
              </div>
              <div style="display:inline-flex;align-items:center;gap:9px;background:rgba(163,190,140,.12);border:1px solid rgba(163,190,140,.42);color:#a3be8c;font-size:12.5px;border-radius:999px;padding:6px 13px">
                <span style="width:8px;height:8px;border-radius:50%;background:#a3be8c;box-shadow:0 0 0 3px rgba(163,190,140,.22)"></span>${esc(availLabel)}
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:20px;color:#9aa7bd;font-size:12.5px">
              <span style="display:inline-flex;align-items:center;gap:7px">${UI.pin}${esc(d.loc)}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:9px">
              <a href="${CONTACT.linkedinUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;border:1px solid #434c5e;border-radius:8px;padding:7px 13px;color:#88c0d0;text-decoration:none;font-size:12.5px">${UI.link}LinkedIn</a>
              <a href="mailto:${CONTACT.email}" style="display:inline-flex;align-items:center;gap:8px;border:1px solid #434c5e;border-radius:8px;padding:7px 13px;color:#88c0d0;text-decoration:none;font-size:12.5px">${UI.mail}Email</a>
              <a href="${CONTACT.whatsappUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;border:1px solid #434c5e;border-radius:8px;padding:7px 13px;color:#88c0d0;text-decoration:none;font-size:12.5px">${UI.whatsapp}WhatsApp</a>
              <a href="${CONTACT.cvFile}" download style="display:inline-flex;align-items:center;gap:8px;border:1px solid #434c5e;border-radius:8px;padding:7px 13px;color:#88c0d0;text-decoration:none;font-size:12.5px">${UI.download}CV.pdf</a>
            </div>
          </div>
        </div>

        <div class="tabs-row" style="display:flex;flex-wrap:wrap;margin:22px 0 18px">${tabsHtml}</div>

        <div class="cmd-line" style="margin-bottom:16px">
          <span style="color:#a3be8c">edgar</span><span style="color:#616e88">@</span><span style="color:#81a1c1">omarchy</span><span style="color:#616e88"> ~/cv </span><span style="color:#b48ead">❯</span> <span style="color:#e5e9f0">${esc(state.displayCmd)}</span><span style="display:inline-block;width:8px;height:15px;background:#88c0d0;vertical-align:-2px;margin-left:3px;animation:blink 1.1s steps(1) infinite"></span>
        </div>

        ${(state.typing || !ready)
          ? `<div style="font-size:13px;color:#ebcb8b;margin-bottom:14px;display:flex;align-items:center;gap:8px"><span style="color:#88c0d0">${SPIN[state.spin % 10]}</span><span>${esc(loadingMsg)}</span></div>`
          : ''}

        <div style="min-height:280px;font-size:14px;color:#d8dee9;line-height:1.7">
          ${ready ? panelFor(tab, d) : ''}
        </div>
      </div>
    </div>
  </div>`;
}

// --- Arranque ---
function boot(): void {
  try {
    const saved = localStorage.getItem('cv_lang');
    if (saved === 'es' || saved === 'en') state.lang = saved;
  } catch {
    /* ignore */
  }

  const app = document.getElementById('app');
  if (app) {
    app.addEventListener('click', (ev) => {
      const target = (ev.target as HTMLElement).closest('[data-action]');
      if (!target) return;
      const action = target.getAttribute('data-action')!;
      if (action === 'lang') toggleLang();
      else if (action.startsWith('tab:')) runTab(action.slice(4));
    });
  }

  const tick = () => {
    const dt = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    set({ clock: `${p(dt.getHours())}:${p(dt.getMinutes())}:${p(dt.getSeconds())}` });
  };
  tick();
  clockTimer = window.setInterval(tick, 1000);

  runTab(state.tab);
}

boot();
