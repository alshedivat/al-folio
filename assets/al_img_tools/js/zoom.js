document.addEventListener("DOMContentLoaded", () => {
  if (typeof mediumZoom !== "function") {
    return;
  }
  mediumZoom("[data-zoomable]", {
    // Append alpha to theme background color to keep content visible under zoom.
    background: `${getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")}ee`,
  });
});
