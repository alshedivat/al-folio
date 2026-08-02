// Prepares kramdown's code-block output for marimo-snippets.
//
// marimo-snippets reads <pre> children of a <marimo-iframe>. Kramdown wraps
// fenced blocks in a .highlighter-rouge div whose nested elements contribute
// whitespace-only text nodes; marimo-snippets reads the element via textContent
// and those nodes show up as blank leading and trailing lines in the notebook.
// So the <pre> is moved out of the wrapper rather than the wrapper moved in.
//
// Runs before marimo-snippets (which is loaded after it) and is idempotent, so
// a page that re-runs it does not double-convert.
(function () {
  "use strict";

  var LANGUAGE_PREFIX = "language-";

  function languageOf(element) {
    var found = "";
    Array.prototype.forEach.call(element.classList, function (name) {
      if (name.indexOf(LANGUAGE_PREFIX) === 0) {
        found = name;
      }
    });
    return found;
  }

  // Kramdown emits a trailing newline inside <code>; marimo renders it as an
  // empty final cell line.
  function trim(pre) {
    Array.prototype.forEach.call(pre.querySelectorAll("code"), function (code) {
      code.textContent = code.textContent.replace(/^\n+/, "").replace(/\s+$/, "");
    });
  }

  function collectBlocks(container) {
    var wrappers = container.querySelectorAll(".highlighter-rouge");
    var blocks = [];

    if (wrappers.length > 0) {
      Array.prototype.forEach.call(wrappers, function (wrapper) {
        var language = languageOf(wrapper);
        var pre = wrapper.querySelector("pre");
        if (!pre) {
          return;
        }
        // marimo-snippets distinguishes Python cells from markdown cells by the
        // language class, which kramdown puts on the wrapper, not the <pre>.
        if (language) {
          pre.classList.add(language);
        }
        trim(pre);
        blocks.push(pre);
      });
      return blocks;
    }

    Array.prototype.forEach.call(container.querySelectorAll("pre"), function (pre) {
      trim(pre);
      blocks.push(pre);
    });
    return blocks;
  }

  // Height is a guess, but a bad guess is very visible: too short and the
  // notebook scrolls inside a stub. Scale with both cell count and line count.
  function estimateHeight(blocks) {
    var lines = blocks.reduce(function (total, pre) {
      return total + (pre.textContent || "").split("\n").filter(Boolean).length;
    }, 0);
    return Math.max(300, 150 + blocks.length * 80 + lines * 22);
  }

  function convert(container) {
    if (container.dataset.alMarimoReady === "true") {
      return;
    }

    var blocks = collectBlocks(container);
    if (blocks.length === 0) {
      // Nothing to run. Leave the markup alone and make it visible again rather
      // than stranding the reader with a permanently hidden block.
      container.dataset.alMarimoReady = "true";
      container.style.visibility = "visible";
      return;
    }

    var frame = document.createElement("marimo-iframe");
    Array.prototype.forEach.call(container.attributes, function (attribute) {
      if (attribute.name.indexOf("data-") === 0 && attribute.name !== "data-al-marimo-ready") {
        frame.setAttribute(attribute.name, attribute.value);
      }
    });
    blocks.forEach(function (pre) {
      frame.appendChild(pre);
    });
    if (!frame.hasAttribute("data-height")) {
      frame.setAttribute("data-height", estimateHeight(blocks) + "px");
    }

    container.textContent = "";
    container.appendChild(frame);
    container.dataset.alMarimoReady = "true";
    container.style.visibility = "visible";
  }

  function ready() {
    Array.prototype.forEach.call(document.querySelectorAll(".al-marimo-inline"), convert);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
