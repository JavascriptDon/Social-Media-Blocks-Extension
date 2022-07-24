// TODO FUTURE: check for more hosts and set them optional

import {
  generateHTML,
  generateSTYLING,
  searchForEmbeddedContent,
} from './utils/utils';
import {
  config,
} from './utils/constants';
import { initializeExtensionVersionNumber } from './utils/utils';

import LottieAnimation from './utils/LottieAnimation';
import settingsAnimationData from '../assets/lottie-animations/settings.json';

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
    ].includes(hostname)
  ) {
    generateSTYLING();
    document.body.innerHTML = generateHTML(hostname.toUpperCase());
  } else {
    searchForEmbeddedContent();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initializeExtensionVersionNumber();
  // Advanced Toggle
  const advancedToggle = document.getElementById('settingsToggle');
  advancedToggle!.addEventListener('click', () => {
    const advancedSettings = document.getElementById('settingsDialog');
    if (config.advanced) {
      advancedSettings!.style.transform = 'scale(1.1)';
      advancedSettings!.style.pointerEvents = 'none';
      advancedSettings!.style.opacity = '0';
      advancedToggle!.innerHTML = config.showAdvancedMessage;
      config.advanced = false;
    } else {
      advancedSettings!.style.transform = 'scale(1)';
      advancedSettings!.style.pointerEvents = 'auto';
      advancedSettings!.style.opacity = '1';
      advancedToggle!.innerHTML = config.hideAdvancedMessage;
      config.advanced = true;
    }
  });
  const settingsAnimationWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById('settings-animation');
  new LottieAnimation({
    wrapper: settingsAnimationWrapper,
    animationData: settingsAnimationData,
  });
});

blockSocialMediaSites();
