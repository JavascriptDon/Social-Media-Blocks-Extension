import {
  generateHTML,
  generateSTYLING,
  searchForEmbeddedContent,
} from './utils/utils';
import {
  config,
} from './utils/constants';
import {
  initializeExtensionVersionNumber,
} from './utils/utils';

import { renderSettings, loadSettings } from './settings/settings';

const BLOCKED_HOSTS = [
  'youtube',
  'facebook',
  'netflix',
  'tiktok',
  'discord',
  'instagram',
  'whatsapp',
  'web.whatsapp',
  'linkedin',
  'twitter',
  'reddit',
  'redditmeda',
];

async function blockSocialMediaSites(): Promise<void> {
  const hostname: string = new URL(window.location.href).hostname
    .replace('.com', '')
    .replace('www.', '')
    .toLowerCase();

  if (!BLOCKED_HOSTS.includes(hostname)) {
    searchForEmbeddedContent();
    return;
  }

  const settings = await loadSettings();

  if (!settings.masterEnabled) return;

  const siteKey = hostname.replace('web.', '');
  if (settings[siteKey] === false) return;

  if (settings.scheduleEnabled) {
    const now = new Date();
    const [startH, startM] = (settings.scheduleStart as string).split(':').map(Number);
    const [endH, endM] = (settings.scheduleEnd as string).split(':').map(Number);
    const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const startSeconds = startH * 3600 + startM * 60;
    const endSeconds = endH * 3600 + endM * 60;

    if (nowSeconds < startSeconds || nowSeconds >= endSeconds) return;

    const msUntilEnd = (endSeconds - nowSeconds) * 1000;
    setTimeout(() => window.location.reload(), msUntilEnd);
  }

  generateSTYLING();
  document.body.innerHTML = generateHTML(hostname.toUpperCase());
}

window.addEventListener('DOMContentLoaded', () => {
  initializeExtensionVersionNumber();
  const [
    advancedToggle,
    extensionElement,
    advancedSettings,
    extensionAcknowledgements,
  ]: Array<HTMLElement> = [
    <HTMLElement>document.getElementById('settingsToggle'),
    <HTMLElement>document.getElementById('extension'),
    <HTMLElement>document.getElementById('settingsDialog'),
    <HTMLElement>document.getElementById('extension-acknowledgements'),
  ];
  advancedToggle!.addEventListener('click', () => {
    if (config.toggleSettings) {
      extensionElement!.classList.add('animate__animated', 'animate__fadeInRight');
      extensionAcknowledgements!.classList.add('animate__animated', 'animate__fadeInLeft');
      extensionElement!.style.setProperty('z-index', '3');
      advancedSettings!.classList.add('animate__animated', 'animate__fadeOutRight');
      advancedSettings!.style.transform = 'scale(1.1)';
      advancedSettings!.style.pointerEvents = 'none';
      advancedSettings!.style.opacity = '0';
      advancedToggle!.innerHTML = config.showSettingsGearIcon;
      config.toggleSettings = false;
    } else {
      extensionElement!.classList.add('animate__animated', 'animate__fadeOutRight');
      extensionAcknowledgements!.classList.add('animate__animated', 'animate__fadeOutLeft');
      advancedSettings!.classList.add('animate__animated', 'animate__fadeInLeft');
      setTimeout( () => {
        extensionElement!.style.setProperty('z-index', '-1');
      }, 1000);
      advancedSettings!.style.transform = 'scale(1)';
      advancedSettings!.style.pointerEvents = 'auto';
      advancedSettings!.style.opacity = '1';
      advancedToggle!.innerHTML = config.hideSettingsGearIcon;
      config.toggleSettings = true;
    }
    advancedSettings!.addEventListener('animationend', () => {
      advancedSettings!.className = '';
      extensionElement!.className = ''
      extensionAcknowledgements!.className = '';
    });
  });

  renderSettings();
});

blockSocialMediaSites();
