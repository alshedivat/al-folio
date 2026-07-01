const searchTheme = typeof determineComputedTheme === "function" ? determineComputedTheme() : "light";
const ninjaKeys = document.querySelector("ninja-keys");

if (ninjaKeys) {
  if (searchTheme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
}

const collapseNavbarIfExpanded = () => {
  const navbarNav = document.getElementById("navbarNav");
  if (!navbarNav || !navbarNav.classList.contains("show")) {
    return;
  }

  const navToggle = document.querySelector('[data-nav-toggle="navbarNav"], .navbar-toggler[aria-controls="navbarNav"]');
  if (navToggle) {
    navToggle.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return;
  }

  navbarNav.classList.remove("show");
  navbarNav.setAttribute("aria-expanded", "false");
};

const openSearchModal = () => {
  collapseNavbarIfExpanded();
  if (ninjaKeys && typeof ninjaKeys.open === "function") {
    ninjaKeys.open();
  }
};

const searchToggle = document.getElementById("search-toggle");
if (searchToggle) {
  searchToggle.addEventListener("click", (event) => {
    event.preventDefault();
    openSearchModal();
  });
}

window.openSearchModal = openSearchModal;
