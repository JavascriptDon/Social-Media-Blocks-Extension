import '../assets/css/style.css';
import './popup.ts';

// Templates:
import PROJECT_TEMPLATES from '../src/templates/templates';

// Mount
document.querySelector<HTMLDivElement>("#app")!.innerHTML = PROJECT_TEMPLATES.indexHTML;