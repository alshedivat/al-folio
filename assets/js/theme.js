// Has to be in the head tag, otherwise a flicker effect will occur.
let initTheme = () => {

  var theme = localStorage.getItem("theme");
  if (theme == null) {
    theme = sessionStorage.getItem("theme");
  }

  if (theme == null) {
    const userPref = window.matchMedia;
    if (userPref && userPref('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  }

  if (theme)  {
    document.documentElement.setAttribute('data-theme', theme)
  }

  sessionStorage.setItem("theme", theme);
}


initTheme();
