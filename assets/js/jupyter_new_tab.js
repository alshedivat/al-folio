document.addEventListener("DOMContentLoaded", () => {
  const notebookIframes = document.querySelectorAll(".jupyter-notebook-iframe-container iframe");

  const updateNotebookLinks = (iframe) => {
    try {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDocument || !iframeDocument.body) {
        return;
      }

      iframeDocument.querySelectorAll("a[href]").forEach((link) => {
        link.setAttribute("target", "_blank");
        const currentRel = link.getAttribute("rel") || "";
        const relParts = currentRel.split(/\s+/).filter(Boolean);
        if (!relParts.includes("noopener")) {
          relParts.push("noopener");
        }
        if (!relParts.includes("noreferrer")) {
          relParts.push("noreferrer");
        }
        link.setAttribute("rel", relParts.join(" "));
      });
    } catch (_error) {
      // Cross-origin iframe access is blocked by design.
    }
  };

  notebookIframes.forEach((iframe) => {
    if (iframe.contentDocument?.readyState === "complete") {
      updateNotebookLinks(iframe);
    }

    iframe.addEventListener("load", () => updateNotebookLinks(iframe));
  });
});
