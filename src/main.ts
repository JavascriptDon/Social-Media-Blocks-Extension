import '../assets/css/style.css';
import 'animate.css';
import { initializeExtensionVersionNumber } from './utils/utils';
import { config } from './utils/constants';
import { renderSettings } from './settings/settings';
import PROJECT_TEMPLATES from '../src/templates/templates';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = PROJECT_TEMPLATES.indexHTML;

window.addEventListener('DOMContentLoaded', () => {
  initializeExtensionVersionNumber();

  const advancedToggle = document.getElementById('settingsToggle') as HTMLElement;
  const extensionElement = document.getElementById('extension') as HTMLElement;
  const advancedSettings = document.getElementById('settingsDialog') as HTMLElement;
  const extensionAcknowledgements = document.getElementById('extension-acknowledgements') as HTMLElement;

  advancedToggle.addEventListener('click', () => {
    if (config.toggleSettings) {
      extensionElement.classList.add('animate__animated', 'animate__fadeInRight');
      extensionAcknowledgements.classList.add('animate__animated', 'animate__fadeInLeft');
      extensionElement.style.setProperty('z-index', '3');
      advancedSettings.classList.add('animate__animated', 'animate__fadeOutRight');
      advancedSettings.style.transform = 'scale(1.1)';
      advancedSettings.style.pointerEvents = 'none';
      advancedSettings.style.opacity = '0';
      advancedToggle.innerHTML = config.showSettingsGearIcon;
      config.toggleSettings = false;
    } else {
      extensionElement.classList.add('animate__animated', 'animate__fadeOutRight');
      extensionAcknowledgements.classList.add('animate__animated', 'animate__fadeOutLeft');
      advancedSettings.classList.add('animate__animated', 'animate__fadeInLeft');
      setTimeout(() => {
        extensionElement.style.setProperty('z-index', '-1');
      }, 1000);
      advancedSettings.style.transform = 'scale(1)';
      advancedSettings.style.pointerEvents = 'auto';
      advancedSettings.style.opacity = '1';
      advancedToggle.innerHTML = config.hideSettingsGearIcon;
      config.toggleSettings = true;
    }
    advancedSettings.addEventListener('animationend', () => {
      advancedSettings.className = '';
      extensionElement.className = '';
      extensionAcknowledgements.className = '';
    });
  });

  renderSettings();
});
