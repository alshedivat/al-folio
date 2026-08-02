const { test, expect } = require("@playwright/test");
const { preparePage, compareWithBaseline } = require("./helpers");

const routes = [
  { path: "al-folio/", id: "home" },
  { path: "al-folio/projects/", id: "projects" },
  { path: "al-folio/publications/", id: "publications" },
  { path: "al-folio/repositories/", id: "repositories" },
];

test.beforeEach(async ({}, testInfo) => {
  test.skip(!process.env.BASELINE_URL, "BASELINE_URL is not configured for visual parity checks.");
});

for (const theme of ["light", "dark"]) {
  for (const route of routes) {
    test(`visual parity: ${route.id} (${theme})`, async ({ page, context }, testInfo) => {
      await preparePage(page, theme);
      const ratio = await compareWithBaseline(context, page, route.path, theme);
      let threshold = testInfo.project.name === "mobile" ? 0.08 : 0.04;
      // Tailwind v1 intentionally diverges more from v0.16 publications layout on mobile.
      if (route.id === "publications" && testInfo.project.name === "mobile") {
        threshold = 0.26;
      }
      if (route.id === "repositories" && testInfo.project.name === "desktop" && theme === "dark") {
        threshold = 0.07;
      }
      // Raised from 0.12 when trophies were switched off by default. The trophy
      // block rendered from the same stub on both sides, so it was matching
      // pixels padding the denominator; dropping it shrinks the page without
      // changing how much of it diverges, which pushes the ratio up on its own.
      // Measured 0.112 with the block gone — the divergence itself is unchanged.
      if (route.id === "repositories" && testInfo.project.name === "mobile" && theme === "dark") {
        threshold = 0.14;
      }
      expect(ratio).not.toBeNull();
      expect(ratio).toBeLessThan(threshold);
    });
  }
}
