// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD035", "hr-style" ],
  "description": "Horizontal rule style",
  "tags": [ "hr" ],
  "parser": "micromark",
  "function": function MD035(params, onError) {
    let style = String(params.config.style || "consistent").trim();
    const thematicBreaks = filterByTypesCached([ "thematicBreak" ]);
    for (const token of thematicBreaks) {
      const { startLine, text } = token;
      if (style === "consistent") {
        style = text;
      }
      addErrorDetailIf(onError, startLine, style, text);
    }
  }
};
