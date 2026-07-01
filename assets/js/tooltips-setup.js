(() => {
  const state = {
    tooltip: null,
    popover: null,
  };

  const createFloating = (className) => {
    const node = document.createElement("div");
    node.className = className;
    node.hidden = true;
    document.body.appendChild(node);
    return node;
  };

  const positionFloating = (trigger, bubble) => {
    const rect = trigger.getBoundingClientRect();
    const left = rect.left + window.scrollX + rect.width / 2 - bubble.offsetWidth / 2;
    const top = rect.top + window.scrollY - bubble.offsetHeight - 8;
    bubble.style.left = `${Math.max(8, left)}px`;
    bubble.style.top = `${Math.max(8, top)}px`;
  };

  const initFallbackTooltips = (root = document) => {
    root.querySelectorAll('[data-toggle="tooltip"]').forEach((trigger) => {
      if (trigger.dataset.afTooltipBound === "true") {
        return;
      }
      trigger.dataset.afTooltipBound = "true";

      const show = () => {
        const text = trigger.getAttribute("title") || trigger.getAttribute("data-original-title") || "";
        if (!text) {
          return;
        }
        if (!state.tooltip) {
          state.tooltip = createFloating("af-tooltip");
        }
        state.tooltip.textContent = text;
        state.tooltip.hidden = false;
        positionFloating(trigger, state.tooltip);
      };

      const hide = () => {
        if (state.tooltip) {
          state.tooltip.hidden = true;
        }
      };

      trigger.addEventListener("mouseenter", show);
      trigger.addEventListener("focus", show);
      trigger.addEventListener("mouseleave", hide);
      trigger.addEventListener("blur", hide);
    });
  };

  const initFallbackPopovers = (root = document) => {
    root.querySelectorAll('[data-toggle="popover"]').forEach((trigger) => {
      if (trigger.dataset.afPopoverBound === "true") {
        return;
      }
      trigger.dataset.afPopoverBound = "true";

      const show = () => {
        const title = trigger.getAttribute("title") || "";
        const content = trigger.getAttribute("data-content") || "";
        const text = [title, content].filter(Boolean).join("\n");
        if (!text) {
          return;
        }
        if (!state.popover) {
          state.popover = createFloating("af-popover");
        }
        state.popover.textContent = text;
        state.popover.hidden = false;
        positionFloating(trigger, state.popover);
      };

      const hide = () => {
        if (state.popover) {
          state.popover.hidden = true;
        }
      };

      trigger.addEventListener("mouseenter", show);
      trigger.addEventListener("focus", show);
      trigger.addEventListener("mouseleave", hide);
      trigger.addEventListener("blur", hide);
    });
  };

  const initTooltips = (root = document) => {
    if (window.AlFolioCompat && typeof window.AlFolioCompat.initTooltips === "function") {
      window.AlFolioCompat.initTooltips(root);
      return;
    }
    initFallbackTooltips(root);
  };

  const initPopovers = (root = document) => {
    if (window.AlFolioCompat && typeof window.AlFolioCompat.initPopovers === "function") {
      window.AlFolioCompat.initPopovers(root);
      return;
    }
    initFallbackPopovers(root);
  };

  window.AlFolioUi = {
    initTooltips,
    initPopovers,
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTooltips(document);
    initPopovers(document);
  });
})();
