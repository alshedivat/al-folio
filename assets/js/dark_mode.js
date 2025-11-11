document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('light-toggle');

  if (!modeToggle || typeof window.toggleTheme !== 'function') {
    return;
  }

  modeToggle.addEventListener('click', (event) => {
    event.preventDefault();
    window.toggleTheme(localStorage.getItem('theme'));
  });
});

