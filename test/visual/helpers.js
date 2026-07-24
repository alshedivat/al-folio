const { PNG } = require("pngjs");
const pixelmatchModule = require("pixelmatch");
const pixelmatch = pixelmatchModule.default || pixelmatchModule;

const REPO_STATS_STUB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"><rect width="400" height="180" fill="#f3f4f6"/><rect x="8" y="8" width="384" height="164" rx="8" fill="#ffffff" stroke="#d1d5db"/><text x="20" y="42" font-size="20" font-family="Arial, sans-serif" fill="#111827">Repository Stats (stub)</text><text x="20" y="76" font-size="14" font-family="Arial, sans-serif" fill="#6b7280">Deterministic fixture for visual parity</text></svg>`;
const REPO_TROPHY_STUB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"><rect width="400" height="180" fill="#111827"/><rect x="8" y="8" width="384" height="164" rx="8" fill="#1f2937" stroke="#374151"/><text x="20" y="42" font-size="20" font-family="Arial, sans-serif" fill="#f9fafb">Repository Trophies (stub)</text><text x="20" y="76" font-size="14" font-family="Arial, sans-serif" fill="#d1d5db">Deterministic fixture for visual parity</text></svg>`;

async function applyNetworkStubs(page) {
  const matchesBlockedHost = (requestUrl) => {
    const blockedDomains = ["google-analytics.com", "plausible.io", "badge.dimensions.ai"];
    try {
      const hostname = new URL(requestUrl).hostname.toLowerCase();
      return blockedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
    } catch {
      return false;
    }
  };

  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (url.includes("github-readme-stats.vercel.app")) {
      route.fulfill({
        status: 200,
        contentType: "image/svg+xml",
        body: REPO_STATS_STUB_SVG,
      });
      return;
    }
    if (url.includes("github-profile-trophy.vercel.app")) {
      route.fulfill({
        status: 200,
        contentType: "image/svg+xml",
        body: REPO_TROPHY_STUB_SVG,
      });
      return;
    }
    if (matchesBlockedHost(url)) {
      route.abort();
      return;
    }
    route.continue();
  });
}

async function preparePage(page, themeSetting = "light") {
  await page.addInitScript((setting) => {
    window.localStorage.setItem("theme", setting);
  }, themeSetting);
  await applyNetworkStubs(page);
}

async function stabilizeVisuals(page) {
  await page.evaluate(() => {
    const styleId = "__alfolio_visual_stabilize";
    if (document.getElementById(styleId)) {
      return;
    }
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0ms !important;
        animation-delay: 0ms !important;
        caret-color: transparent !important;
      }
      .altmetric-embed,
      .__dimensions_badge_embed__,
      iframe.giscus-frame,
      #giscus_thread,
      .cc-window {
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
  });
}

function diffRatio(actualPng, baselinePng) {
  const width = Math.min(actualPng.width, baselinePng.width);
  const height = Math.min(actualPng.height, baselinePng.height);
  const actual = new PNG({ width, height });
  const baseline = new PNG({ width, height });
  PNG.bitblt(actualPng, actual, 0, 0, width, height, 0, 0);
  PNG.bitblt(baselinePng, baseline, 0, 0, width, height, 0, 0);
  const diff = new PNG({ width, height });
  const changed = pixelmatch(actual.data, baseline.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });
  return changed / (width * height);
}

async function compareWithBaseline(context, currentPage, route, themeSetting, options = {}) {
  const fullPage = options.fullPage !== false;

  const captureParityScreenshot = async (page) => {
    if (!fullPage) {
      return page.screenshot({ fullPage: false });
    }

    const maxScreenshotDimension = 32760;
    const dimensions = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body || { scrollWidth: 0, scrollHeight: 0 };
      return {
        width: Math.max(doc.scrollWidth, body.scrollWidth, doc.clientWidth),
        height: Math.max(doc.scrollHeight, body.scrollHeight, doc.clientHeight),
      };
    });

    if (dimensions.width <= maxScreenshotDimension && dimensions.height <= maxScreenshotDimension) {
      return page.screenshot({ fullPage: true });
    }

    const viewport = page.viewportSize() || { width: 1280, height: 720 };
    const clipWidth = Math.max(1, Math.min(Math.max(viewport.width, dimensions.width), maxScreenshotDimension));
    const clipHeight = Math.max(1, Math.min(Math.max(viewport.height, dimensions.height), maxScreenshotDimension));

    return page.screenshot({
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: clipWidth,
        height: clipHeight,
      },
    });
  };

  const baselineURL = process.env.BASELINE_URL;
  if (!baselineURL) {
    return null;
  }
  const normalizedRoute = route.replace(/^\//, "");
  const normalizedBaselineRoot = baselineURL.endsWith("/") ? baselineURL : `${baselineURL}/`;
  const baselineTarget = new URL(normalizedRoute, normalizedBaselineRoot).toString();

  const baselinePage = await context.newPage();
  await preparePage(baselinePage, themeSetting);
  await baselinePage.goto(baselineTarget, { waitUntil: "networkidle" });
  await stabilizeVisuals(baselinePage);
  await baselinePage.waitForTimeout(500);
  const baselineBuffer = await captureParityScreenshot(baselinePage);

  await currentPage.goto(normalizedRoute, { waitUntil: "networkidle" });
  await stabilizeVisuals(currentPage);
  await currentPage.waitForTimeout(500);
  const currentBuffer = await captureParityScreenshot(currentPage);

  await baselinePage.close();

  return diffRatio(PNG.sync.read(currentBuffer), PNG.sync.read(baselineBuffer));
}

module.exports = {
  preparePage,
  stabilizeVisuals,
  compareWithBaseline,
};
