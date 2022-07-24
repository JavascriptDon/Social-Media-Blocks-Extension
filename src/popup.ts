// TODO FUTURE: check for more hosts and set them optional

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
  const settingsAnimationWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById('settings-animation');
  const animationInstance = new LottieAnimation({
    wrapper: settingsAnimationWrapper,
    animationData: settingsAnimationData,
  });
  animationInstance.animationSpeed = 1.5;
});

blockSocialMediaSites();
