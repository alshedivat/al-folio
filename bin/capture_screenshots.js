#!/usr/bin/env node
// Regenerates the screenshots used by README.md.
//
// Run via `.github/workflows/update-screenshots.yml` rather than locally: the
// pages pull webfonts, FontAwesome, Academicons and the GitHub stat-card
// service from external origins, and a screenshot taken somewhere those are
// unreachable silently loses its icons and emoji. CI has unrestricted egress,
// so the shots match what a visitor actually sees.
//
//   node bin/capture_screenshots.js <base-url> <out-dir> [name ...]
//
// Passing one or more names limits the run to those shots.

const { chromium } = require("playwright");
const path = require("path");

const BASE = (process.argv[2] || "http://127.0.0.1:4000/al-folio").replace(/\/$/, "");
const OUT = process.argv[3] || "readme_preview";
const ONLY = process.argv.slice(4);

// height is the capture viewport, chosen per page so the shot ends on a
// sensible boundary instead of mid-paragraph. Full-page captures were tried and
// render as unreadable ribbons in the README.
const SHOTS = [
  { name: "al-folio-preview", url: "/", theme: "light", height: 900 },
  { name: "light", url: "/", theme: "light", height: 1000 },
  { name: "dark", url: "/", theme: "dark", height: 1000 },
  { name: "cv", url: "/cv/", theme: "light", height: 1100 },
  { name: "people", url: "/people/", theme: "light", height: 950 },
  { name: "publications", url: "/publications/", theme: "light", height: 1100 },
  { name: "projects", url: "/projects/", theme: "light", height: 1000 },
  { name: "blog", url: "/blog/", theme: "light", height: 1100 },
  { name: "repositories", url: "/repositories/", theme: "light", height: 1100, settle: 9000 },
  { name: "distill", url: "/blog/2021/distill/", theme: "light", height: 1100 },
  { name: "math", url: "/blog/2015/math/", theme: "light", height: 1000, settle: 6000 },
  { name: "code", url: "/blog/2015/code/", theme: "light", height: 1000 },
  { name: "jupyter", url: "/blog/2023/jupyter-notebook/", theme: "light", height: 1000 },
  { name: "photos-screenshot", url: "/projects/1_project/", theme: "light", height: 1100, settle: 6000 },
];

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  let failures = 0;

  for (const shot of SHOTS) {
    if (ONLY.length && !ONLY.includes(shot.name)) continue;

    const ctx = await browser.newContext({
      viewport: { width: 1280, height: shot.height },
      // Retina capture; GitHub downscales cleanly and the text stays crisp.
      deviceScaleFactor: 2,
      colorScheme: shot.theme === "dark" ? "dark" : "light",
      reducedMotion: "reduce",
    });

    // The theme is driven by localStorage -> data-theme-setting on <html>.
    // Setting it before first paint avoids capturing a flash of the wrong theme.
    await ctx.addInitScript((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch (e) {
        /* private mode */
      }
    }, shot.theme);

    const page = await ctx.newPage();
    const failedRequests = [];
    // `requestfailed` only covers transport-level failures. A stylesheet or
    // webfont that answers 404 or 503 completes normally and never fires it,
    // and a missing CSS file is invisible to the broken-image check below — so
    // watch response status codes too, or the exact degradation this script
    // exists to catch slips through.
    page.on("requestfailed", (r) => failedRequests.push(`${r.url()} (${(r.failure() || {}).errorText})`));
    page.on("response", (res) => {
      if (res.status() >= 400) failedRequests.push(`${res.url()} (HTTP ${res.status()})`);
    });

    try {
      await page.goto(BASE + shot.url, { waitUntil: "load", timeout: 60000 });
    } catch (err) {
      console.error(`FAIL ${shot.name}: ${err.message.split("\n")[0]}`);
      failures++;
      await ctx.close();
      continue;
    }

    // Let webfonts, MathJax, charts and lazy images settle.
    await page.waitForTimeout(shot.settle || 4000);
    try {
      await page.evaluate(() => document.fonts && document.fonts.ready);
    } catch (e) {
      /* older engines */
    }

    // A screenshot missing its icons or emoji is worse than a stale one, so
    // surface that here instead of letting it land in the README unnoticed.
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.src)
    );

    await page.screenshot({ path: path.join(OUT, `${shot.name}.png`) });

    const notes = [];
    if (broken.length) notes.push(`${broken.length} broken image(s): ${broken.slice(0, 3).join(", ")}`);
    if (failedRequests.length) notes.push(`${failedRequests.length} failed request(s): ${failedRequests.slice(0, 3).join(", ")}`);
    if (notes.length) {
      console.error(`WARN ${shot.name}: ${notes.join(" | ")}`);
      failures++;
    } else {
      console.log(`OK   ${shot.name}`);
    }

    await ctx.close();
  }

  await browser.close();

  if (failures) {
    console.error(`\n${failures} shot(s) rendered with missing assets. Not treating these as usable.`);
    process.exit(1);
  }
})();
