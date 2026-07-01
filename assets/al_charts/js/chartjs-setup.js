/* Replace each `chartjs` code block with a rendered Chart.js canvas.
   Runs at full load so the deferred Chart.js CDN script is available.
   Vanilla JS (no jQuery) — jQuery is not loaded in al-folio v1. */
document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") return;
  document.querySelectorAll(".language-chartjs").forEach((el) => {
    const text = el.textContent;
    if (!text) return;
    const canvas = document.createElement("canvas");
    el.textContent = "";
    el.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      new Chart(ctx, JSON.parse(text));
      el.setAttribute("data-processed", "true");
    }
  });
});
