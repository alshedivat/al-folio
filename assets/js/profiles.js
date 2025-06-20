function scrollHighlighter(configs, offset = 120) {
  const scrollHandler = () => {
    configs.forEach(({ sectionSelector, linkSelector }) => {
      const sections = document.querySelectorAll(sectionSelector);
      const links = document.querySelectorAll(linkSelector);

      let current = "";
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - offset) {
          current = section.id;
        }
      });

      links.forEach(link => {
        const targetId = link.getAttribute("href").slice(1);
        link.classList.toggle("font-weight-bold", targetId === current);
      });
    });
  };

  window.addEventListener("scroll", scrollHandler);
  scrollHandler(); // call once on load
}

document.addEventListener("DOMContentLoaded", () => {
  scrollHighlighter([
    { sectionSelector: ".letter-section", linkSelector: ".letter-link" },
    { sectionSelector: ".status-section", linkSelector: ".status-link" }
  ]);
});