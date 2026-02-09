// Load data from inline JSON script
(function () {
  const el = document.getElementById("data-json");
  if (el) {
    try {
      window.__DATA__ = JSON.parse(el.textContent);
    } catch (e) {
      console.error("JSON parse error", e);
    }
  }
})();

document.getElementById("copy-btn")?.addEventListener("click", () => {
  const data = window.__DATA__ || [];
  const text = data.map((d) => d.text || "").join("\n\n");
  const btn = document.getElementById("copy-btn");
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = original;
        }, 1500);
      }
    })
    .catch((err) => console.error("Copy failed", err));
});

// Toggle card open on click anywhere in card
document.getElementById("cards")?.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const idx = card.dataset.idx;
  const note = (window.__DATA__ || [])[idx];
  const viewer = document.getElementById("viewer");
  if (note && viewer) {
    if (typeof marked !== "undefined") {
      viewer.innerHTML = marked.parse(note.text || "");
    } else {
      viewer.textContent = note.text || "";
    }
  }
  document
    .querySelectorAll(".card.selected")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
});
