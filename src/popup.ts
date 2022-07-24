// ToDo: check for more hosts and set them optional

import {
  generateHTML,
  generateSTYLING,
  searchForEmbeddedContent,
} from './utils/utils';

function blockSocialMediaSites(): void {
  const hostname: string = new URL(window.location.href).hostname.replace('.com', '').replace('www.', '').toLowerCase();
  if (
    [
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
    ].includes(hostname)) {
      generateSTYLING();
      document.body.innerHTML = generateHTML(hostname.toUpperCase());
  } else {
    searchForEmbeddedContent();
  }
}

blockSocialMediaSites();