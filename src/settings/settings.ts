import '../../assets/css/settings.css';

interface SiteDefinition {
  key: string;
  label: string;
  icon: string;
}

export interface SmbSettings {
  masterEnabled: boolean;
  scheduleEnabled: boolean;
  scheduleStart: string;
  scheduleEnd: string;
  allowanceEnabled: boolean;
  allowanceMinutes: number;
  customSites: string[];
  [key: string]: boolean | string | number | string[];
}

export const SITES: SiteDefinition[] = [
  { key: 'youtube',   label: 'YouTube',     icon: '📺' },
  { key: 'netflix',   label: 'Netflix',     icon: '🎬' },
  { key: 'tiktok',    label: 'TikTok',      icon: '🎵' },
  { key: 'instagram', label: 'Instagram',   icon: '📸' },
  { key: 'whatsapp',  label: 'WhatsApp',    icon: '💬' },
  { key: 'linkedin',  label: 'LinkedIn',    icon: '💼' },
  { key: 'twitter',   label: 'Twitter / X', icon: '🐦' },
  { key: 'reddit',    label: 'Reddit',      icon: '🤖' },
];

const STORAGE_KEY = 'smb_settings';

function defaultSettings(): SmbSettings {
  const d: SmbSettings = {
    masterEnabled: true,
    scheduleEnabled: false,
    scheduleStart: '09:00',
    scheduleEnd: '17:00',
    allowanceEnabled: false,
    allowanceMinutes: 15,
    customSites: [],
  };
  SITES.forEach((s) => { d[s.key] = true; });
  return d;
}

function hasChromeStorage(): boolean {
  return typeof chrome !== 'undefined' && !!chrome.storage?.local;
}

export function loadSettings(): Promise<SmbSettings> {
  if (!hasChromeStorage()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? (JSON.parse(raw) as SmbSettings) : undefined;
      return Promise.resolve(saved ? { ...defaultSettings(), ...saved } : defaultSettings());
    } catch {
      return Promise.resolve(defaultSettings());
    }
  }
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const saved = result[STORAGE_KEY] as SmbSettings | undefined;
      resolve(saved ? { ...defaultSettings(), ...saved } : defaultSettings());
    });
  });
}

export function saveSettings(s: SmbSettings): Promise<void> {
  if (!hasChromeStorage()) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: s }, resolve);
  });
}

function parseHostname(input: string): string | null {
  let raw = input.trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  try {
    const host = new URL(raw).hostname.replace(/^www\./i, '').toLowerCase();
    if (!host || !host.includes('.')) return null;
    return host;
  } catch {
    return null;
  }
}

function createToggleRow(
  id: string,
  label: string,
  checked: boolean,
  onChange: (val: boolean) => void
): { row: HTMLDivElement; checkbox: HTMLInputElement } {
  const row = document.createElement('div');
  row.className = 'smb-row';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'smb-row-label';
  nameSpan.textContent = label;

  const lbl = document.createElement('label');
  lbl.className = 'smb-toggle';
  lbl.htmlFor = id;

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.id = id;
  cb.checked = checked;
  cb.addEventListener('change', () => onChange(cb.checked));

  const slider = document.createElement('span');
  slider.className = 'smb-slider';

  lbl.appendChild(cb);
  lbl.appendChild(slider);
  row.appendChild(nameSpan);
  row.appendChild(lbl);

  return { row, checkbox: cb };
}

function createSectionHead(text: string): HTMLDivElement {
  const h = document.createElement('div');
  h.className = 'smb-section-head';
  h.textContent = text;
  return h;
}

function createTimeInput(id: string, value: string, labelText: string): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.className = 'smb-time-wrap';

  const lbl = document.createElement('label');
  lbl.htmlFor = id;
  lbl.textContent = labelText;

  const inp = document.createElement('input');
  inp.type = 'time';
  inp.id = id;
  inp.className = 'smb-time-input';
  inp.value = value;
  inp.addEventListener('change', () => {
    loadSettings().then((cur) => {
      cur[id.replace('smb-', '')] = inp.value;
      saveSettings(cur);
    });
  });

  wrap.appendChild(lbl);
  wrap.appendChild(inp);
  return wrap;
}

function buildCustomSitesList(
  customSites: string[],
  listEl: HTMLUListElement
): void {
  listEl.innerHTML = '';
  if (customSites.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'smb-custom-empty';
    empty.textContent = 'No custom sites added yet.';
    listEl.appendChild(empty);
    return;
  }
  customSites.forEach((site) => {
    const li = document.createElement('li');
    li.className = 'smb-custom-item';

    const name = document.createElement('span');
    name.className = 'smb-custom-name';
    name.textContent = site;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'smb-remove-btn';
    removeBtn.title = `Remove ${site}`;
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
      loadSettings().then((cur) => {
        cur.customSites = cur.customSites.filter((s) => s !== site);
        saveSettings(cur).then(() => buildCustomSitesList(cur.customSites, listEl));
      });
    });

    li.appendChild(name);
    li.appendChild(removeBtn);
    listEl.appendChild(li);
  });
}

export async function renderSettings(): Promise<void> {
  const header = document.getElementById('social-media-blocker-settings-header');
  const container = document.getElementById('settings-animation');
  if (!header || !container) return;

  header.textContent = 'Extension settings';
  container.innerHTML = '';

  const s = await loadSettings();

  /* ── General ── */
  container.appendChild(createSectionHead('General'));

  const siteList = document.createElement('ul');

  const masterEl = createToggleRow('smb-master', '🔒 Blocking enabled', s.masterEnabled, (val) => {
    loadSettings().then((cur) => {
      cur.masterEnabled = val;
      saveSettings(cur);
      siteList.style.opacity = val ? '1' : '0.4';
      siteList.style.pointerEvents = val ? 'auto' : 'none';
    });
  });
  container.appendChild(masterEl.row);

  /* ── Work hours ── */
  container.appendChild(createSectionHead('Work hours'));

  const timeRow = document.createElement('div');
  timeRow.className = 'smb-time-row';
  timeRow.style.opacity = s.scheduleEnabled ? '1' : '0.4';
  timeRow.style.pointerEvents = s.scheduleEnabled ? 'auto' : 'none';

  const schedEl = createToggleRow('smb-schedule', '🕐 Active hours only', s.scheduleEnabled, (val) => {
    loadSettings().then((cur) => {
      cur.scheduleEnabled = val;
      saveSettings(cur);
      timeRow.style.opacity = val ? '1' : '0.4';
      timeRow.style.pointerEvents = val ? 'auto' : 'none';
    });
  });
  container.appendChild(schedEl.row);

  timeRow.appendChild(createTimeInput('smb-scheduleStart', s.scheduleStart as string, 'From'));
  timeRow.appendChild(createTimeInput('smb-scheduleEnd',   s.scheduleEnd   as string, 'To'));
  container.appendChild(timeRow);

  /* ── Daily allowance ── */
  container.appendChild(createSectionHead('Daily allowance'));

  const minutesRow = document.createElement('div');
  minutesRow.className = 'smb-minutes-row';
  minutesRow.style.opacity = s.allowanceEnabled ? '1' : '0.4';
  minutesRow.style.pointerEvents = s.allowanceEnabled ? 'auto' : 'none';

  const allowEl = createToggleRow('smb-allowance', '⏱ Allow daily break', s.allowanceEnabled, (val) => {
    loadSettings().then((cur) => {
      cur.allowanceEnabled = val;
      saveSettings(cur);
      minutesRow.style.opacity = val ? '1' : '0.4';
      minutesRow.style.pointerEvents = val ? 'auto' : 'none';
    });
  });
  container.appendChild(allowEl.row);

  const minLabel = document.createElement('span');
  minLabel.className = 'smb-row-label';
  minLabel.textContent = 'Minutes per day';

  const minInput = document.createElement('input');
  minInput.type = 'number';
  minInput.id = 'smb-allowanceMinutes';
  minInput.className = 'smb-number-input';
  minInput.min = '1';
  minInput.max = '120';
  minInput.value = String(s.allowanceMinutes);
  minInput.addEventListener('change', () => {
    loadSettings().then((cur) => {
      cur.allowanceMinutes = parseInt(minInput.value, 10) || 15;
      saveSettings(cur);
    });
  });

  minutesRow.appendChild(minLabel);
  minutesRow.appendChild(minInput);
  container.appendChild(minutesRow);

  /* ── Blocked sites (built-in) ── */
  container.appendChild(createSectionHead('Blocked sites'));

  siteList.id = 'smb-site-list';
  siteList.style.opacity = s.masterEnabled ? '1' : '0.4';
  siteList.style.pointerEvents = s.masterEnabled ? 'auto' : 'none';

  SITES.forEach((site) => {
    const li = document.createElement('li');
    li.className = 'smb-site-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'smb-site-name';
    nameSpan.textContent = `${site.icon} ${site.label}`;

    const lbl = document.createElement('label');
    lbl.className = 'smb-toggle';
    lbl.htmlFor = `smb-toggle-${site.key}`;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `smb-toggle-${site.key}`;
    cb.checked = s[site.key] !== false;
    cb.addEventListener('change', () => {
      loadSettings().then((cur) => {
        cur[site.key] = cb.checked;
        saveSettings(cur);
      });
    });

    const slider = document.createElement('span');
    slider.className = 'smb-slider';

    lbl.appendChild(cb);
    lbl.appendChild(slider);
    li.appendChild(nameSpan);
    li.appendChild(lbl);
    siteList.appendChild(li);
  });

  container.appendChild(siteList);

  /* ── Custom blocked sites ── */
  container.appendChild(createSectionHead('Custom sites'));

  const addRow = document.createElement('div');
  addRow.className = 'smb-add-row';

  const addInput = document.createElement('input');
  addInput.type = 'text';
  addInput.className = 'smb-add-input';
  addInput.placeholder = 'Paste URL or domain…';
  addInput.spellcheck = false;

  const errorMsg = document.createElement('span');
  errorMsg.className = 'smb-add-error';
  errorMsg.style.display = 'none';

  const addBtn = document.createElement('button');
  addBtn.className = 'smb-add-btn';
  addBtn.textContent = 'Add';

  const customList = document.createElement('ul');
  customList.className = 'smb-custom-list';
  buildCustomSitesList(s.customSites, customList);

  const doAdd = () => {
    const hostname = parseHostname(addInput.value);
    if (!hostname) {
      errorMsg.textContent = 'Enter a valid URL or domain (e.g. example.com)';
      errorMsg.style.display = 'block';
      return;
    }
    errorMsg.style.display = 'none';
    loadSettings().then((cur) => {
      if (!cur.customSites.includes(hostname)) {
        cur.customSites = [...cur.customSites, hostname];
        saveSettings(cur).then(() => {
          buildCustomSitesList(cur.customSites, customList);
          addInput.value = '';
        });
      } else {
        errorMsg.textContent = `${hostname} is already in the list.`;
        errorMsg.style.display = 'block';
      }
    });
  };

  addBtn.addEventListener('click', doAdd);
  addInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doAdd();
  });

  addRow.appendChild(addInput);
  addRow.appendChild(addBtn);
  container.appendChild(addRow);
  container.appendChild(errorMsg);
  container.appendChild(customList);
}