// @ts-check

"use strict";

const { addErrorContext } = require("../helpers");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": ["MD027", "no-multiple-space-blockquote"],
  "description": "Multiple spaces after blockquote symbol",
  "tags": ["blockquote", "whitespace", "indentation"],
  "parser": "micromark",
  "function": function MD027(params, onError) {
    for (const token of filterByTypesCached([ "linePrefix" ])) {
      const siblings = token.parent?.children || params.parsers.micromark.tokens;
      if (siblings[siblings.indexOf(token) - 1]?.type === "blockQuotePrefix") {
        const { startColumn, startLine, text } = token;
        const { length } = text;
        const line = params.lines[startLine - 1];
        addErrorContext(
          onError,
          startLine,
          line,
          undefined,
          undefined,
          [ startColumn, length ],
          {
            "editColumn": startColumn,
            "deleteCount": length
          }
        );
      }
    }
  }
};
