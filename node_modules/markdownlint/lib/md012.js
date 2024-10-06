// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { addRangeToSet } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD012", "no-multiple-blanks" ],
  "description": "Multiple consecutive blank lines",
  "tags": [ "whitespace", "blank_lines" ],
  "parser": "micromark",
  "function": function MD012(params, onError) {
    const maximum = Number(params.config.maximum || 1);
    const { lines } = params;
    const codeBlockLineNumbers = new Set();
    for (const codeBlock of filterByTypesCached([ "codeFenced", "codeIndented" ])) {
      addRangeToSet(codeBlockLineNumbers, codeBlock.startLine, codeBlock.endLine);
    }
    let count = 0;
    for (const [ lineIndex, line ] of lines.entries()) {
      const inCode = codeBlockLineNumbers.has(lineIndex + 1);
      count = (inCode || (line.trim().length > 0)) ? 0 : count + 1;
      if (maximum < count) {
        addErrorDetailIf(
          onError,
          lineIndex + 1,
          maximum,
          count,
          undefined,
          undefined,
          undefined,
          {
            "deleteCount": -1
          }
        );
      }
    }
  }
};
