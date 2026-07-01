document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  if (!grid || typeof window.Masonry !== "function") {
    return;
  }

  const masonry = new window.Masonry(grid, {
    gutter: 10,
    horizontalOrder: true,
    itemSelector: ".grid-item",
  });

  if (typeof window.imagesLoaded === "function") {
    const tracker = window.imagesLoaded(grid);
    if (tracker && typeof tracker.on === "function") {
      tracker.on("progress", () => masonry.layout());
      return;
    }
  }

  masonry.layout();
});
