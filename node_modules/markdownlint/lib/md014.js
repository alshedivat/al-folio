// @ts-check

"use strict";

const { addErrorContext } = require("../helpers");
const { filterByTypes } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const dollarCommandRe = /^(\s*)(\$\s+)/;

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD014", "commands-show-output" ],
  "description": "Dollar signs used before commands without showing output",
  "tags": [ "code" ],
  "parser": "micromark",
  "function": function MD014(params, onError) {
    for (const codeBlock of filterByTypesCached([ "codeFenced", "codeIndented" ])) {
      const codeFlowValues = filterByTypes(
        codeBlock.children,
        [ "codeFlowValue" ]
      );
      const dollarMatches = codeFlowValues.
        map((codeFlowValue) => ({
          "result": codeFlowValue.text.match(dollarCommandRe),
          "startColumn": codeFlowValue.startColumn,
          "startLine": codeFlowValue.startLine,
          "text": codeFlowValue.text
        })).
        filter((dollarMatch) => dollarMatch.result);
      if (dollarMatches.length === codeFlowValues.length) {
        for (const dollarMatch of dollarMatches) {
          // @ts-ignore
          const column = dollarMatch.startColumn + dollarMatch.result[1].length;
          // @ts-ignore
          const length = dollarMatch.result[2].length;
          addErrorContext(
            onError,
            dollarMatch.startLine,
            dollarMatch.text,
            undefined,
            undefined,
            [ column, length ],
            {
              "editColumn": column,
              "deleteCount": length
            }
          );
        }
      }
    }
  }
};
