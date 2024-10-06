// @ts-check

"use strict";

const { addErrorDetailIf, fencedCodeBlockStyleFor } = require("../helpers");
const { tokenIfType } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD048", "code-fence-style" ],
  "description": "Code fence style",
  "tags": [ "code" ],
  "parser": "micromark",
  "function": function MD048(params, onError) {
    const style = String(params.config.style || "consistent");
    let expectedStyle = style;
    const codeFenceds = filterByTypesCached([ "codeFenced" ]);
    for (const codeFenced of codeFenceds) {
      const codeFencedFence = tokenIfType(codeFenced.children[0], "codeFencedFence");
      if (codeFencedFence) {
        const codeFencedFenceSequence = tokenIfType(codeFencedFence.children[0], "codeFencedFenceSequence");
        if (codeFencedFenceSequence) {
          const { startLine, text } = codeFencedFenceSequence;
          if (expectedStyle === "consistent") {
            expectedStyle = fencedCodeBlockStyleFor(text);
          }
          addErrorDetailIf(
            onError,
            startLine,
            expectedStyle,
            fencedCodeBlockStyleFor(text)
          );
        }
      }
    }
  }
};
