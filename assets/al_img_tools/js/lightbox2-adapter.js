document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll("a[data-lightbox]"));
  if (!links.length) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "al-lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image preview");
  overlay.innerHTML = `
    <button type="button" class="al-lightbox-close" aria-label="Close preview">&times;</button>
    <button type="button" class="al-lightbox-nav al-lightbox-prev" aria-label="Previous image">&#10094;</button>
    <figure class="al-lightbox-figure">
      <img class="al-lightbox-image" alt="">
      <figcaption class="al-lightbox-caption"></figcaption>
    </figure>
    <button type="button" class="al-lightbox-nav al-lightbox-next" aria-label="Next image">&#10095;</button>
  `;
  document.body.appendChild(overlay);

  const image = overlay.querySelector(".al-lightbox-image");
  const caption = overlay.querySelector(".al-lightbox-caption");
  const closeBtn = overlay.querySelector(".al-lightbox-close");
  const prevBtn = overlay.querySelector(".al-lightbox-prev");
  const nextBtn = overlay.querySelector(".al-lightbox-next");

  let currentGroup = [];
  let currentIndex = 0;

  const readCaption = (link) => {
    return link.getAttribute("data-title") || link.querySelector("img")?.getAttribute("alt") || "";
  };

  const updateView = () => {
    const link = currentGroup[currentIndex];
    if (!link) {
      return;
    }
    image.src = link.href;
    image.alt = readCaption(link);
    caption.textContent = readCaption(link);
    prevBtn.disabled = currentGroup.length <= 1;
    nextBtn.disabled = currentGroup.length <= 1;
  };

  const open = (group, index) => {
    currentGroup = group;
    currentIndex = index;
    updateView();
    overlay.classList.add("is-open");
    document.body.classList.add("al-lightbox-open");
  };

  const close = () => {
    overlay.classList.remove("is-open");
    image.src = "";
    document.body.classList.remove("al-lightbox-open");
  };

  const step = (delta) => {
    if (currentGroup.length <= 1) {
      return;
    }
    currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
    updateView();
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const groupName = link.getAttribute("data-lightbox") || "__default";
      const group = links.filter((candidate) => (candidate.getAttribute("data-lightbox") || "__default") === groupName);
      const index = group.indexOf(link);
      open(group, index < 0 ? 0 : index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) {
      return;
    }
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowLeft") {
      step(-1);
    } else if (event.key === "ArrowRight") {
      step(1);
    }
  });
});
