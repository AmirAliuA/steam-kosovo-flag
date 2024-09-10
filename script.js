function replaceFlag() {
  // For /id/ and /profiles/ pages
  var profileFlag = document.querySelector(".profile_flag");
  if (profileFlag) {
    var src = profileFlag.src;

    if (src.includes("https://community.akamai.steamstatic.com/public/images/countryflags/xk.gif")) {
      var newSrc = browser.runtime.getURL("images/kosovo-flag-16x11.png");

      profileFlag.src = newSrc;

      console.log("[KosovoFlagFixer] The flag on /id/ or /profiles/ page has been successfully changed.");
      console.log("[KosovoFlagFixer] oldSrc: " + src + " | newSrc: " + newSrc + ".");
    } else {
      console.log("[KosovoFlagFixer] No image with class 'profile_flag' found on /id/ or /profiles/ page.");
    }
  }

  // For the /groups/ page
  var groupstatDiv = document.querySelectorAll(".groupstat");
  groupstatDiv.forEach(function(div) {
    var label = div.querySelector(".label");

    if (label && label.textContent.includes("Location")) {
      var image = div.querySelector("img");
    
      if (image && image.src.includes("https://community.akamai.steamstatic.com/public/images/countryflags/xk.gif")) {
        var newSrc = browser.runtime.getURL("images/kosovo-flag-16x11.png");

        image.src = newSrc;

        console.log("[KosovoFlagFixer] The Kosovo flag on the /groups/ page has been successfully changed.");
        console.log("[KosovoFlagFixer] oldSrc: " + image.src + " | newSrc: " + newSrc + ".");
      }
    }
  });

  console.log("[KosovoFlagFixer] If there are any errors, please report them here: https://github.com/AmirAliuA/steam-kosovo-flag/issues/new");
}

// Create a MutationObserver to detect changes in the DOM for dynamically loaded content
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
      replaceFlag();
  });
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Finally replace the flag
replaceFlag();