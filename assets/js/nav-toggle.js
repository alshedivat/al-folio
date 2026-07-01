document.addEventListener("DOMContentLoaded", () => {
  const navToggles = Array.from(document.querySelectorAll("[data-nav-toggle]"));

  const closeNav = (toggle) => {
    const targetId = toggle.getAttribute("data-nav-toggle") || toggle.getAttribute("aria-controls");
    if (!targetId) {
      return;
    }

    const panel = document.getElementById(targetId);
    if (!panel) {
      return;
    }

    panel.classList.remove("show");
    toggle.classList.add("collapsed");
    toggle.setAttribute("aria-expanded", "false");
  };

  navToggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("data-nav-toggle") || toggle.getAttribute("aria-controls");
    if (!targetId) {
      return;
    }

    const panel = document.getElementById(targetId);
    if (!panel) {
      return;
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = panel.classList.contains("show");
      panel.classList.toggle("show", !isOpen);
      toggle.classList.toggle("collapsed", isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  const navDropdownToggles = Array.from(document.querySelectorAll("[data-nav-dropdown-toggle]"));
  const closeAllNavDropdowns = (except) => {
    navDropdownToggles.forEach((toggle) => {
      if (except && toggle === except) {
        return;
      }
      const item = toggle.closest(".dropdown");
      const menu = item?.querySelector(".dropdown-menu");
      if (!menu) {
        return;
      }

      item.classList.remove("show");
      menu.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  navDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const item = toggle.closest(".dropdown");
      const menu = item?.querySelector(".dropdown-menu");
      if (!item || !menu) {
        return;
      }

      const isOpen = menu.classList.contains("show");
      closeAllNavDropdowns(toggle);

      item.classList.toggle("show", !isOpen);
      menu.classList.toggle("show", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    navToggles.forEach((toggle) => {
      const targetId = toggle.getAttribute("data-nav-toggle") || toggle.getAttribute("aria-controls");
      const panel = targetId ? document.getElementById(targetId) : null;
      if (!panel || !panel.classList.contains("show")) {
        return;
      }

      const clickedInsidePanel = panel.contains(event.target);
      const clickedToggle = toggle.contains(event.target);
      if (!clickedInsidePanel && !clickedToggle) {
        closeNav(toggle);
      }
    });

    closeAllNavDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navToggles.forEach(closeNav);
      closeAllNavDropdowns();
    }
  });
});
