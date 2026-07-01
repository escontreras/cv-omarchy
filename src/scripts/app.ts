import { TABS, type Lang } from '../data/cv';

type State = {
  lang: Lang;
  tab: string;
  typing: boolean;
  panelReady: boolean;
  spin: number;
};

const state: State = {
  lang: 'es',
  tab: TABS[0].id,
  typing: false,
  panelReady: false,
  spin: 0,
};

let typeTimer: number | undefined;
let spinTimer: number | undefined;
let readyTimer: number | undefined;
let clockTimer: number | undefined;

const SPIN = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const cmdText = document.getElementById('cmd-text');
const tabLabel = document.getElementById('tab-label');
const loadingRow = document.getElementById('loading-row');
const loadingSpin = document.getElementById('loading-spin');
const loadingMsg = document.getElementById('loading-msg');
const clockEl = document.getElementById('clock');

function clearSeq(): void {
  if (typeTimer) clearInterval(typeTimer);
  if (spinTimer) clearInterval(spinTimer);
  if (readyTimer) clearTimeout(readyTimer);
  typeTimer = spinTimer = readyTimer = undefined;
}

function setLoadingVisible(visible: boolean): void {
  loadingRow?.classList.toggle('flex', visible);
  loadingRow?.classList.toggle('hidden', !visible);
}

function updateActiveButtons(): void {
  document.querySelectorAll<HTMLElement>('[data-tab-btn]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.tabBtn === state.tab);
  });
  document.querySelectorAll<HTMLElement>('[data-ws-btn]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.wsBtn === state.tab);
  });
}

function updatePanels(): void {
  document.querySelectorAll<HTMLElement>('.cv-panel').forEach((panel) => {
    const matches = panel.dataset.panel === state.tab && panel.dataset.lang === state.lang && state.panelReady;
    if (!matches) {
      panel.style.display = 'none';
    } else if (panel.classList.contains('grid')) {
      panel.style.display = 'grid';
    } else if (panel.classList.contains('flex')) {
      panel.style.display = 'flex';
    } else {
      panel.style.display = 'block';
    }
  });
}

function updateTabLabel(): void {
  const meta = TABS.find((t) => t.id === state.tab) ?? TABS[0];
  if (tabLabel) tabLabel.textContent = meta[state.lang];
}

function runTab(id: string): void {
  clearSeq();
  const meta = TABS.find((t) => t.id === id) ?? TABS[0];
  const full = meta.cmd[state.lang];
  state.tab = id;
  state.typing = true;
  state.panelReady = false;
  state.spin = 0;

  updateActiveButtons();
  updateTabLabel();
  updatePanels();
  setLoadingVisible(false);
  if (cmdText) cmdText.textContent = '';

  let i = 0;
  typeTimer = window.setInterval(() => {
    i++;
    if (cmdText) cmdText.textContent = full.slice(0, i);
    if (i >= full.length) {
      if (typeTimer) clearInterval(typeTimer);
      typeTimer = undefined;
      state.typing = false;
      readyTimer = window.setTimeout(() => {
        if (spinTimer) clearInterval(spinTimer);
        spinTimer = undefined;
        state.panelReady = true;
        setLoadingVisible(false);
        updatePanels();
      }, 240);
    }
  }, 40);

  spinTimer = window.setInterval(() => {
    state.spin = (state.spin + 1) % 10;
    if (loadingSpin) loadingSpin.textContent = SPIN[state.spin];
    if (loadingMsg) {
      const prefix = state.lang === 'es' ? 'cargando ' : 'loading ';
      loadingMsg.textContent = prefix + meta[state.lang] + '…';
    }
    setLoadingVisible(true);
  }, 90);
}

function toggleLang(): void {
  const l: Lang = state.lang === 'es' ? 'en' : 'es';
  try {
    localStorage.setItem('cv_lang', l);
  } catch {
    /* ignore */
  }
  state.lang = l;
  document.documentElement.dataset.lang = l;
  runTab(state.tab);
}

function boot(): void {
  const saved = document.documentElement.dataset.lang;
  if (saved === 'es' || saved === 'en') state.lang = saved;

  document.addEventListener('click', (ev) => {
    const target = (ev.target as HTMLElement).closest<HTMLElement>('[data-action], [data-tab-btn], [data-ws-btn]');
    if (!target) return;
    if (target.dataset.action === 'lang') toggleLang();
    else if (target.dataset.tabBtn) runTab(target.dataset.tabBtn);
    else if (target.dataset.wsBtn) runTab(target.dataset.wsBtn);
  });

  const tick = () => {
    const dt = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${p(dt.getHours())}:${p(dt.getMinutes())}:${p(dt.getSeconds())}`;
  };
  tick();
  clockTimer = window.setInterval(tick, 1000);

  runTab(state.tab);
}

boot();
