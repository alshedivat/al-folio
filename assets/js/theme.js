// Has to be in the head tag, otherwise a flicker effect will occur.

(() => {
  'use strict';

  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';
  const THEME_STORAGE_KEY = 'theme';
  const TRANSITION_DELAY = 500;
  const HIGHLIGHT_LIGHT_ID = 'highlight_theme_light';
  const HIGHLIGHT_DARK_ID = 'highlight_theme_dark';
  const GISCUS_ORIGIN = 'https://giscus.app';

  function toggleTheme(currentTheme) {
    const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(nextTheme);
  }

  function setTheme(theme, { animate = true } = {}) {
    const normalizedTheme = theme && theme !== 'null' ? theme : null;

    if (animate) {
      applyTransition();
    }

    updateHighlight(normalizedTheme);
    updateGiscusTheme(normalizedTheme);

    if (normalizedTheme) {
      document.documentElement.setAttribute('data-theme', normalizedTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme ? normalizedTheme : '');

    const mediumZoomInstance = window.mediumZoomInstance;
    if (mediumZoomInstance) {
      mediumZoomInstance.update({
        background: `${getComputedStyle(document.documentElement).getPropertyValue('--global-bg-color')}ee`,
      });
    }
  }

  function updateHighlight(theme) {
    const lightStylesheet = document.getElementById(HIGHLIGHT_LIGHT_ID);
    const darkStylesheet = document.getElementById(HIGHLIGHT_DARK_ID);

    if (!lightStylesheet || !darkStylesheet) {
      return;
    }

    const prefersDark = theme === DARK_THEME;

    lightStylesheet.media = prefersDark ? 'none' : '';
    darkStylesheet.media = prefersDark ? '' : 'none';
  }

  function updateGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) {
      return;
    }

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: { theme: theme ? theme : LIGHT_THEME },
        },
      },
      GISCUS_ORIGIN,
    );
  }

  function applyTransition() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, TRANSITION_DELAY);
  }

  function detectInitialTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && storedTheme !== 'null' && storedTheme !== '') {
      return storedTheme;
    }

    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery && mediaQuery.matches) {
        return DARK_THEME;
      }
    }

    return null;
  }

  function initialiseTheme() {
    setTheme(detectInitialTheme(), { animate: false });
  }

  initialiseTheme();

  window.toggleTheme = toggleTheme;
})();
