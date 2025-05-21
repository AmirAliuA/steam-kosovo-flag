/*
 * Kosovo Flag Fixer for Steam
 * ---------------------------
 * This script replaces the Kosovo country flag (XK) on Steam profiles and group pages
 * with a custom flag from the extension assets. It covers multiple CDNs used by Steam.
 *
 * @author Amir Aliu
 * @version 1.0
 * @license All Rights Reserved
 *
 * License Terms:
 * - You are NOT allowed to use this code for commercial purposes.
 * - You are NOT allowed to copy, redistribute, or modify this code.
 * - You are NOT allowed to upload or mirror this code elsewhere.
 * - This code is provided for **personal use only**.
 * - All rights reserved by the author.
*/


// Known Kosovo flag URLs on Steam CDNs (to detect and replace)
const flagUrls = [
  "https://community.akamai.steamstatic.com/public/images/countryflags/xk.gif", // Akamai CDN
  "https://community.cloudflare.steamstatic.com/public/images/countryflags/xk.gif", // Cloudflare CDN
  "https://community.fastly.steamstatic.com/public/images/countryflags/xk.gif" // Fastly CDN
]

// Cross-browser runtime API for getting extension asset URLs
const runtime = (typeof browser !== "undefined") ? browser.runtime : chrome.runtime;

// Custom Kosovo flag inside extension
const newSrc = runtime.getURL("images/kosovo-flag-16x11.png");

// Returns true if the image URL matches a known Kosovo flag CDN URL.
function isXKFlag(src) {
  return flagUrls.some(url => src.includes(url));
}

// Replaces Kosovo flags on Steam profile and group pages.
function replaceFlag() {
  // Handle user profile flag replacement
  const profileFlag = document.querySelector(".profile_flag");
  if (profileFlag && isXKFlag(profileFlag.src)) {
    profileFlag.src = newSrc;
    profileFlag.alt = "Kosovo Flag";
    profileFlag.title = "Kosovo";
    console.log("[Kosovo Flag Fixer] Replaced flag on /id/ or /profiles/ page.");
  }

  // Handle group page location flag replacement
  const groupstatDivs = document.querySelectorAll(".groupstat");
  groupstatDivs.forEach(div => {
    const label = div.querySelector(".label");
    const image = div.querySelector("img");

    if (label && label.textContent.includes("Location") && image && isXKFlag(image.src)) {
      image.src = newSrc;
      image.alt = "Kosovo Flag";
      image.title = "Kosovo";
      console.log("[Kosovo Flag Fixer] Replaced flag on /groups/ page.");
    }
  });
}

// Observe DOM mutations to catch dynamically loaded flags
let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(replaceFlag, 100);
});

// Start observing changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Initial flag replacement when the script loads
replaceFlag();