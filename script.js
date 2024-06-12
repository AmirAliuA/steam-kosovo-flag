var image = document.querySelector(".profile_flag");
var src = image.src;

if (src.includes("https://community.akamai.steamstatic.com/public/images/countryflags/xk.gif")) {
    var newSrc = browser.runtime.getURL("images/kosovo-flag-16x11.png");
    
    image.src = newSrc;

    console.log("[KosovoFlagFixer] The flag has been successfully changed.");
    console.log("[KosovoFlagFixer] src: " + src + " | " + "newSrc: " + newSrc + ".");
}