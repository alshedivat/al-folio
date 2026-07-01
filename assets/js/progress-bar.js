/*
 * This JavaScript code has been adapted from the article
 * https://css-tricks.com/reading-position-indicator/ authored by Pankaj Parashar,
 * published on the website https://css-tricks.com on the 7th of May, 2014.
 * Couple of changes were made to the original code to make it compatible
 * with the `al-folio` theme.
 *
 * v1.0 migration note:
 * Keep behavior equivalent to the previous jQuery implementation, but with
 * a dependency-free runtime so it works when jQuery is not loaded.
 */

const progressBar = document.getElementById("progress");

window.addEventListener("load", () => {
  setTimeout(progressBarSetup, 50);
});

function progressBarSetup() {
  if (!progressBar) return;

  if ("max" in document.createElement("progress")) {
    initializeProgressElement();
    document.addEventListener("scroll", () => {
      progressBar.value = getCurrentScrollPosition();
    });
    window.addEventListener("resize", initializeProgressElement);
  } else {
    resizeProgressBar();
    document.addEventListener("scroll", resizeProgressBar);
    window.addEventListener("resize", resizeProgressBar);
  }
}

function getCurrentScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
}

function getElementOuterHeightWithMargins(element) {
  if (!element) return 0;
  const styles = window.getComputedStyle(element);
  const marginTop = parseFloat(styles.marginTop) || 0;
  const marginBottom = parseFloat(styles.marginBottom) || 0;
  return element.getBoundingClientRect().height + marginTop + marginBottom;
}

function initializeProgressElement() {
  const navbar = document.getElementById("navbar");
  const navbarHeight = Math.round(getElementOuterHeightWithMargins(navbar));

  document.body.style.paddingTop = `${navbarHeight}px`;
  progressBar.style.top = `${navbarHeight}px`;
  progressBar.max = getDistanceToScroll();
  progressBar.value = getCurrentScrollPosition();
}

function getDistanceToScroll() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
}

function resizeProgressBar() {
  progressBar.style.width = `${getWidthPercentage()}%`;
}

function getWidthPercentage() {
  const distanceToScroll = getDistanceToScroll();
  if (distanceToScroll === 0) return 0;
  return (getCurrentScrollPosition() / distanceToScroll) * 100;
}
