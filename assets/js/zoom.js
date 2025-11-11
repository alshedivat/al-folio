// Initialize medium zoom.
document.addEventListener('DOMContentLoaded', () => {
  if (typeof mediumZoom !== 'function') {
    return;
  }

  const backgroundColor = `${getComputedStyle(document.documentElement).getPropertyValue('--global-bg-color')}ee`;

  const instance = mediumZoom('[data-zoomable]', {
    background: backgroundColor, // + 'ee' for transparency.
  });

  window.mediumZoomInstance = instance;
});
