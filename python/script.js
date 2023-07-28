// JavaScript to toggle dark and bright modes
const body = document.body;
const toggleBtn = document.getElementById('toggle-btn');
const toggleSwitch = document.querySelector('.toggle-switch');

// Function to check the scroll position and toggle visibility of the toggle switch
function toggleButtonVisibility() {
  if (window.scrollY > 0) {
    toggleSwitch.style.display = 'none';
  } else {
    toggleSwitch.style.display = 'block';
  }
}

// Add event listener for scrolling to call the function
window.addEventListener('scroll', toggleButtonVisibility);

// Function to handle the toggle switch state change
function handleDarkModeToggle() {
  body.classList.toggle('dark-mode');
  // Also toggle the dark mode for each section
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.classList.toggle('dark-mode');
  });
}

toggleBtn.addEventListener('change', handleDarkModeToggle);
