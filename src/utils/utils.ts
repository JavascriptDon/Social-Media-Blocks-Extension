import { HOSTS } from './constants';

/**
 * Search for embedded content to hide inside websites.
 */
export function searchForEmbeddedContent(): void {
  const contextIframes: Array<HTMLIFrameElement> = [].slice.call(
    document.querySelectorAll<HTMLIFrameElement>('iframe')
  );
  for (const iframe of contextIframes) {
    for (const host in HOSTS) {
      if (iframe.getAttribute('src')?.includes(host)) iframe.style.display = 'none';
    }
  }
}

/**
 * Generate HTML to render on the blocked social media site.
 *
 * @param {String} pageName Name of the social media site
 * @returns {String} The newly generated HTML to render on the social media site that is being blocked.
 */
export function generateHTML(pageName: string): string {
  return `
  <div id="clouds">
    <div class="cloud x1"></div>
    <div class="cloud x1_5"></div>
    <div class="cloud x2"></div>
    <div class="cloud x3"></div>
    <div class="cloud x4"></div>
    <div class="cloud x5"></div>
  </div>
  <div class="text">
    <h1>404</h1>
    <hr id="horizontal-page-break">
    <div class='_1'>GET BACK TO WORK</div>
    <div class='_2'>STUDYING > ${pageName}</div>
  </div>
  
  <div class="astronaut">
    <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="" class="src">
  </div>
  `;
}

/**
 * Inject the Vimeo tech custom css.
 */
export function generateSTYLING(): void {
  const css = `
  body {
    margin: 0;
    padding: 0;
    font-family: "Tomorrow", sans-serif;
    height: 100vh;
    background-image: linear-gradient(
      to top,
      #2e1753,
      #1f1746,
      #131537,
      #0d1028,
      #050819
    );
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .text {
    position: absolute;
    top: 10%;
    color: #fff;
    text-align: center;
  }
  h1 {
    font-size: 20vw;
    line-height: 1;
    margin: 0;
    letter-spacing: 0.2em;
    margin-bottom: 50px;
    color: #fff;
    text-shadow: 7px 7px 20px #00000026;
  }
  ._1 {
    text-align: center;
    display: block;
    position: relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
    margin-top: 20px;
  }
  ._2 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 20px;
    margin-top: 60px;
  }
  .astronaut img{
    width:100px;
    position:absolute;
    top:55%;
    animation:astronautFly 6s infinite linear;
  }
  @keyframes astronautFly{
    0%{
      left:-100px;
    }
    25%{
      top:50%;
      transform:rotate(30deg);
    }
    50%{
      transform:rotate(45deg);
      top:55%;
    }
    75%{
      top:60%;
      transform:rotate(30deg);
    }
    100%{
      left:110%;
      transform:rotate(45deg);
    }
  }

  #horizontal-page-break {
    border: 0;
    clear: both;
    display: block;
    width: 100%;               
    background-color: #FFFFFF;
    height: 1px;
  }
  
  .cloud {
    width: 350px;
    height: 120px;
  
    background: #fff;
    background: linear-gradient(top, #fff 100%);
    background: -webkit-linear-gradient(top, #fff 100%);
    background: -moz-linear-gradient(top, #fff 100%);
    background: -ms-linear-gradient(top, #fff 100%);
    background: -o-linear-gradient(top, #fff 100%);
  
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
  
    position: absolute;
    margin: 120px auto 20px;
    transition: ease 1s;
  }
  
  .cloud:after,
  .cloud:before {
    content: "";
    position: absolute;
    background: #fff;
    z-index: -1;
  }
  
  .cloud:after {
    width: 100px;
    height: 100px;
    top: -50px;
    left: 50px;
  
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
  }
  
  .cloud:before {
    width: 180px;
    height: 180px;
    top: -90px;
    right: 50px;
  
    border-radius: 200px;
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
  }
  
  .x1 {
    top: -50px;
    left: 100px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    opacity: 0.9;
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
  }
  
  .x1_5 {
    top: -80px;
    left: 250px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    -webkit-animation: moveclouds 17s linear infinite;
    -moz-animation: moveclouds 17s linear infinite;
    -o-animation: moveclouds 17s linear infinite;
  }
  
  .x2 {
    left: 250px;
    top: 30px;
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6;
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }
  
  .x3 {
    left: 250px;
    bottom: -70px;
  
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.8;
  
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }
  
  .x4 {
    left: 470px;
    botttom: 20px;
  
    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75;
  
    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
  }
  
  .x5 {
    left: 200px;
    top: 300px;
  
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    transform: scale(0.5);
    opacity: 0.8;
  
    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }
  
  @-webkit-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-moz-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-o-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }  
   `;

  const head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
  const style: HTMLStyleElement = document.createElement('style');

  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

/**
 * Fetch the extensions current vesrion.
 */
export function initializeExtensionVersionNumber() {
  const version = chrome?.runtime?.getManifest()?.version;
  if (!version) return document.getElementById('extension-version')!.innerHTML = 'dev mode'; 
  document.getElementById('extension-version')!.innerHTML = 'v' + version;

  return fetch('https://raw.githubusercontent.com/JavascriptDon/Social-Media-Blocks-Extension/main/manifest.json')
    .then((response) => response.json())
    .then((json) => {
      if (compareVersions(json.version, version)) {
        document.getElementById('extension-update')!.innerHTML = json.version;
        document.getElementById('extension-update')!.style.padding = '.25rem .5rem';
      }
    });
  // .catch(console.error);
}

/**
 * Compare version from the manifest.json file.
 * 
 * @param latestVersion
 * @param currentVersion 
 * @returns whether or not the current version is outdated
 */
function compareVersions(latestVersion: string, currentVersion: string): boolean {
  let latestExtVersion = latestVersion?.split('.');
  let currentExtVersion = currentVersion?.split('.');
  let outdated = false;
  if (!latestExtVersion || !currentExtVersion) return false;
  for (let i = 0; i < Math.max(latestExtVersion.length, currentExtVersion.length); i++) {
    let latest = i < latestExtVersion.length ? parseInt(latestExtVersion[i]) : 0;
    let current = i < currentExtVersion.length ? parseInt(currentExtVersion[i]) : 0;
    if (latest > current) {
      outdated = true;
      break;
    } else if (latest < current) {
      outdated = false;
      break;
    }
  }
  return outdated;
}
