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
  [key: string]: boolean | string | number;
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
  };
  SITES.forEach((s) => { d[s.key] = true; });
  return d;
}

export function loadSettings(): Promise<SmbSettings> {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const saved = result[STORAGE_KEY] as SmbSettings | undefined;
      if (saved) {
        resolve({ ...defaultSettings(), ...saved });
      } else {
        resolve(defaultSettings());
      }
    });
  });
}

export function saveSettings(s: SmbSettings): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: s }, resolve);
  });
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

  /* ── Blocked sites ── */
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
}
