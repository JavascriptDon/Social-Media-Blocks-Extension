import '../assets/css/style.css';
import './popup.ts';

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="modal-header">
  <h1 class="logo">
    <img src="./assets/images/logo128.png" alt="Social Media Blocks" class="logo-icon" />Social Media Blocks <span class="version">(1.0.0)</span>
  </h1>
  </div>
  <div class="modal-content">
  <p>Early Access To Social Media Block !</p>
  </div>
  <div class="modal-icons">
  <div class="container">
    <h3>How to access:</h3>
    <ul>
      <li>
        Clone this repo on <span><a href="https://github.com/JavascriptDon/Social-Media-Blocks-Extension" target="_blank">github</a></span
        >.
      </li>
      <li>Go in to Google Chrome Extensions and turn Developer Mode on.</li>
      <li>Click on Load Unpacked.</li>
      <li>Select folder which contains content of this repos.</li>
      <li>Click the switch button to turn extension on and it should work.</li>
    </ul>
  </div>
  </div>
  <div id="modal-footer">
  <a href="https://github.com/JavascriptDon/Social-Media-Blocks-Extension" target="_blank"><p>MIT © HR</p></a>
  </div>
`;