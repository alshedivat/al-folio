// @ts-check

"use strict";

const { addErrorContext } = require("../helpers");
const { addRangeToSet } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD018", "no-missing-space-atx" ],
  "description": "No space after hash on atx style heading",
  "tags": [ "headings", "atx", "spaces" ],
  "parser": "micromark",
  "function": function MD018(params, onError) {
    const { lines } = params;
    const ignoreBlockLineNumbers = new Set();
    for (const ignoreBlock of filterByTypesCached([ "codeFenced", "codeIndented", "htmlFlow" ])) {
      addRangeToSet(ignoreBlockLineNumbers, ignoreBlock.startLine, ignoreBlock.endLine);
    }
    for (const [ lineIndex, line ] of lines.entries()) {
      if (
        !ignoreBlockLineNumbers.has(lineIndex + 1) &&
        /^#+[^# \t]/.test(line) &&
        !/#\s*$/.test(line) &&
        !line.startsWith("#️⃣")
      ) {
        // @ts-ignore
        const hashCount = /^#+/.exec(line)[0].length;
        addErrorContext(
          onError,
          lineIndex + 1,
          line.trim(),
          undefined,
          undefined,
          [ 1, hashCount + 1 ],
          {
            "editColumn": hashCount + 1,
            "insertText": " "
          }
        );
      }
    }
  }
};
