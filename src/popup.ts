import {
  generateHTML,
  generateSTYLING,
  searchForEmbeddedContent,
} from './utils/utils';
import { loadSettings } from './settings/settings';

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
  const rawHostname: string = new URL(window.location.href).hostname
    .replace(/^www\./i, '')
    .toLowerCase();

  const strippedHostname = rawHostname.replace('.com', '');

  const isBuiltIn = BLOCKED_HOSTS.includes(strippedHostname);

  const settings = await loadSettings();

  const isCustom =
    Array.isArray(settings.customSites) &&
    settings.customSites.some(
      (site) => rawHostname === site || rawHostname.endsWith('.' + site)
    );

  if (!isBuiltIn && !isCustom) {
    searchForEmbeddedContent();
    return;
  }

  if (!settings.masterEnabled) return;

  if (isBuiltIn && !isCustom) {
    const siteKey = strippedHostname.replace('web.', '');
    if (settings[siteKey] === false) return;
  }

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
  document.body.innerHTML = generateHTML(rawHostname.toUpperCase());
}

blockSocialMediaSites();
