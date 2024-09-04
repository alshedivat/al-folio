<<<<<<< HEAD
document.addEventListener("readystatechange",()=>{if("interactive"===document.readyState){let e=navigator.platform.toUpperCase().indexOf("MAC")>=0,t=document.querySelector("#search-toggle .nav-link");t&&e&&(t.innerHTML='&#x2318; k <i class="ti ti-search"></i>')}});
=======
// Check if the user is on a Mac and update the shortcut key for search accordingly
document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    let isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    let shortcutKeyElement = document.querySelector("#search-toggle .nav-link");
    if (shortcutKeyElement && isMac) {
      // use the unicode for command key
      shortcutKeyElement.innerHTML = '&#x2318; k <i class="ti ti-search"></i>';
    }
  }
});
>>>>>>> master
