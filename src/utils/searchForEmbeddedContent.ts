import HOSTS from './constants';

/**
 * Search for embedded content to hide inside websites and if any are found, hide them.
 */
 export default function searchForEmbeddedContent(): void {
  const contextIframes: Array<HTMLIFrameElement> = [].slice.call(
    document.querySelectorAll<HTMLIFrameElement>("iframe")
  );
  for (const iframe of contextIframes) {
    for (const host in HOSTS) {
      if (iframe.getAttribute("src")?.includes(host))
        iframe.style.display = "none";
    }
  }
};