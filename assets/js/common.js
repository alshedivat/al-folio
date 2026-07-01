document.addEventListener("DOMContentLoaded", () => {
  const toggleSpecs = [
    { trigger: "a.abstract", target: ".abstract.hidden" },
    { trigger: "a.award", target: ".award.hidden" },
    { trigger: "a.bibtex", target: ".bibtex.hidden" },
  ];

  const resolveToggleScope = (link) => {
    const linksContainer = link.closest(".links");
    if (linksContainer && linksContainer.parentElement) {
      return linksContainer.parentElement;
    }

    return link.closest("li, .card-body, article, .post, .row") || link.parentElement;
  };

  const closePanels = (scope, exceptPanel) => {
    scope.querySelectorAll(".abstract.hidden.open, .award.hidden.open, .bibtex.hidden.open").forEach((panel) => {
      if (panel !== exceptPanel) {
        panel.classList.remove("open");
      }
    });
  };

  toggleSpecs.forEach((spec) => {
    document.querySelectorAll(spec.trigger).forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const scope = resolveToggleScope(link);
        if (!scope) {
          return;
        }

        const panel = scope.querySelector(spec.target);
        if (panel) {
          closePanels(scope, panel);
          panel.classList.toggle("open");
        }
      });
    });
  });

  document.querySelectorAll("a.waves-effect, a.waves-light").forEach((anchor) => {
    anchor.classList.remove("waves-effect", "waves-light");
  });

  const tocSidebar = document.querySelector("#toc-sidebar");
  const contentRoot = document.querySelector('[role="main"]') || document.querySelector("main") || document.body;
  const buildSidebarToc = (tocRoot) => {
    const headings = Array.from(contentRoot.querySelectorAll("h2, h3")).filter((heading) => {
      return !heading.hasAttribute("data-toc-skip");
    });

    if (!headings.length) {
      return;
    }

    const list = document.createElement("ul");
    list.className = "toc-list";

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      const item = document.createElement("li");
      item.className = "toc-list-item";
      const link = document.createElement("a");
      link.className = "toc-link";
      link.href = `#${heading.id}`;
      link.textContent = heading.dataset.tocText || heading.textContent.trim();
      if (heading.tagName.toLowerCase() === "h3") {
        item.classList.add("is-collapsible");
      }

      item.appendChild(link);
      list.appendChild(item);
    });

    tocRoot.replaceChildren(list);
  };

  if (tocSidebar) {
    const resolveTocCollapseDepth = () => {
      const explicitDepth = Number.parseInt(tocSidebar.dataset.tocCollapseDepth || "", 10);
      if (!Number.isNaN(explicitDepth) && explicitDepth >= 0) {
        return explicitDepth;
      }

      const collapseMode = (tocSidebar.dataset.tocCollapse || "expanded").toLowerCase();
      if (["auto", "scroll", "true", "collapsed"].includes(collapseMode)) {
        // Keep top-level entries visible and expand nested branches while scrolling.
        return 3;
      }

      return 6;
    };

    document.querySelectorAll(".publications h2").forEach((heading) => {
      heading.setAttribute("data-toc-skip", "");
    });

    const headings = Array.from(contentRoot.querySelectorAll("h2, h3")).filter((heading) => !heading.hasAttribute("data-toc-skip"));
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    });

    const applyCustomTocLabels = () => {
      tocSidebar.querySelectorAll(".toc-link").forEach((link) => {
        const anchor = link.getAttribute("href") || "";
        const headingId = decodeURIComponent(anchor.replace(/^#/, ""));
        if (!headingId) {
          return;
        }
        const heading = document.getElementById(headingId);
        const customText = heading?.dataset?.tocText;
        if (customText) {
          link.textContent = customText;
        }
      });
    };

    if (window.tocbot && typeof window.tocbot.init === "function" && headings.length > 0) {
      if (typeof window.tocbot.destroy === "function") {
        window.tocbot.destroy();
      }

      window.tocbot.init({
        tocSelector: "#toc-sidebar",
        contentSelector: '[role="main"]',
        headingSelector: "h2, h3",
        ignoreSelector: "[data-toc-skip]",
        hasInnerContainers: true,
        collapseDepth: resolveTocCollapseDepth(),
        orderedList: false,
        activeLinkClass: "is-active-link",
        scrollSmooth: true,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });
      applyCustomTocLabels();
    } else {
      buildSidebarToc(tocSidebar);
    }
  }

  const prefersTheme = () => {
    if (typeof window.determineComputedTheme === "function") {
      return window.determineComputedTheme();
    }
    return document.documentElement.dataset.theme || "light";
  };

  const jupyterTheme = prefersTheme();
  document.querySelectorAll(".jupyter-notebook-iframe-container iframe").forEach((iframe) => {
    const applyNotebookStyling = () => {
      const iframeDocument = iframe.contentDocument;
      if (!iframeDocument) {
        return;
      }

      if (!iframeDocument.querySelector('link[data-al-folio-jupyter="true"]')) {
        const cssLink = iframeDocument.createElement("link");
        cssLink.href = "../css/jupyter.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.setAttribute("data-al-folio-jupyter", "true");
        iframeDocument.head.appendChild(cssLink);
      }

      if (jupyterTheme === "dark") {
        iframeDocument.body?.setAttribute("data-jp-theme-light", "false");
        iframeDocument.body?.setAttribute("data-jp-theme-name", "JupyterLab Dark");
      }
    };

    if (iframe.contentDocument?.readyState === "complete") {
      applyNotebookStyling();
    }
    iframe.addEventListener("load", applyNotebookStyling);
  });

  if (window.AlFolioUi && typeof window.AlFolioUi.initPopovers === "function") {
    window.AlFolioUi.initPopovers(document);
  }
});
