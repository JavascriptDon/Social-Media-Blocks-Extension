import { HOSTS } from "./constants";

/**
 * Search for embedded content to hide inside websites.
 */
export function searchForEmbeddedContent(): void {
  const contextIframes: Array<HTMLIFrameElement> = [].slice.call(
    document.querySelectorAll<HTMLIFrameElement>("iframe"),
  );
  for (const iframe of contextIframes) {
    for (const host in HOSTS) {
      if (iframe.getAttribute("src")?.includes(host))
        iframe.style.display = "none";
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

  <div class="smb-hero">
    <span class="smb-badge">● BLOCKED</span>
    <h1 class="smb-headline">
      STUDYING&nbsp;<span class="smb-arrow">›</span>&nbsp;<span class="smb-site">${pageName}</span>
    </h1>
    <p class="smb-sub">Close the tab and get back on track.</p>
  </div>

  <div class="astronaut">
    <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="">
  </div>
  `;
}

/**
 * Inject the Vimeo tech custom css.
 */
export function generateSTYLING(): void {
  const css = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    height: 100vh;
    background: linear-gradient(to top, #2e1753, #1f1746, #131537, #0d1028, #050819);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  /* ── Hero ── */
  .smb-hero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .smb-hero::before {
    content: '';
    position: absolute;
    inset: -40px -60px;
    background: radial-gradient(ellipse at center, rgba(95, 187, 151, 0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }

  .smb-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(95, 187, 151, 0.12);
    border: 1px solid rgba(95, 187, 151, 0.35);
    color: #5fbb97;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    padding: 5px 14px;
    border-radius: 100px;
    text-transform: uppercase;
    animation: smb-fade-in 0.4s ease both;
  }

  .smb-headline {
    font-size: clamp(28px, 5.5vw, 56px);
    font-weight: 900;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.15;
    text-transform: uppercase;
    animation: smb-slide-up 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .smb-arrow {
    color: #5fbb97;
  }

  .smb-site {
    color: #5fbb97;
    text-shadow: 0 0 32px rgba(95, 187, 151, 0.4);
  }

  .smb-sub {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    animation: smb-slide-up 0.5s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes smb-fade-in {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes smb-slide-up {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Astronaut ── */
  .astronaut img {
    width: 100px;
    position: absolute;
    top: 55%;
    animation: astronautFly 6s infinite linear;
  }

  @keyframes astronautFly {
    0%   { left: -100px; }
    25%  { top: 50%;  transform: rotate(30deg); }
    50%  { top: 55%;  transform: rotate(45deg); }
    75%  { top: 60%;  transform: rotate(30deg); }
    100% { left: 110%; transform: rotate(45deg); }
  }

  /* ── Clouds ── */
  .cloud {
    width: 350px;
    height: 120px;
    background: rgba(255, 255, 255, 0.82);
    border-radius: 100px;
    position: absolute;
    margin: 120px auto 20px;
  }

  .cloud::after,
  .cloud::before {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.82);
    z-index: -1;
  }

  .cloud::after {
    width: 100px;
    height: 100px;
    top: -50px;
    left: 50px;
    border-radius: 100px;
  }

  .cloud::before {
    width: 180px;
    height: 180px;
    top: -90px;
    right: 50px;
    border-radius: 200px;
  }

  .x1   { top: -50px;  left: 100px; transform: scale(0.3);  opacity: 0.5;  animation: moveclouds 15s linear infinite; }
  .x1_5 { top: -80px;  left: 250px; transform: scale(0.3);  opacity: 0.4;  animation: moveclouds 17s linear infinite; }
  .x2   { top: 30px;   left: 250px; transform: scale(0.6);  opacity: 0.3;  animation: moveclouds 25s linear infinite; }
  .x3   { bottom: -70px; left: 250px; transform: scale(0.6); opacity: 0.4; animation: moveclouds 25s linear infinite; }
  .x4   { bottom: 20px;  left: 470px; transform: scale(0.75); opacity: 0.35; animation: moveclouds 18s linear infinite; }
  .x5   { top: 300px;  left: 200px; transform: scale(0.5);  opacity: 0.4;  animation: moveclouds 20s linear infinite; }

  @keyframes moveclouds {
    0%   { margin-left:  1000px; }
    100% { margin-left: -1000px; }
  }
  `;

  const head: HTMLHeadElement =
    document.head || document.getElementsByTagName("head")[0];
  const style: HTMLStyleElement = document.createElement("style");

  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

/**
 * Fetch the extensions current vesrion.
 */
export function initializeExtensionVersionNumber() {
  const version = chrome?.runtime?.getManifest()?.version;
  if (!version)
    return (document.getElementById("extension-version")!.innerHTML =
      "dev mode");
  document.getElementById("extension-version")!.innerHTML = "v" + version;

  return fetch(
    "https://raw.githubusercontent.com/JavascriptDon/Social-Media-Blocks-Extension/main/manifest.json",
  )
    .then((response) => response.json())
    .then((json) => {
      if (compareVersions(json.version, version)) {
        document.getElementById("extension-update")!.innerHTML = json.version;
        document.getElementById("extension-update")!.style.padding =
          ".25rem .5rem";
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
function compareVersions(
  latestVersion: string,
  currentVersion: string,
): boolean {
  let latestExtVersion = latestVersion?.split(".");
  let currentExtVersion = currentVersion?.split(".");
  let outdated = false;
  if (!latestExtVersion || !currentExtVersion) return false;
  for (
    let i = 0;
    i < Math.max(latestExtVersion.length, currentExtVersion.length);
    i++
  ) {
    let latest =
      i < latestExtVersion.length ? parseInt(latestExtVersion[i]) : 0;
    let current =
      i < currentExtVersion.length ? parseInt(currentExtVersion[i]) : 0;
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
