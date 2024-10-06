// @ts-check

"use strict";

const { addErrorContext } = require("../helpers");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD023", "heading-start-left" ],
  "description": "Headings must start at the beginning of the line",
  "tags": [ "headings", "spaces" ],
  "parser": "micromark",
  "function": function MD023(params, onError) {
    const headings = filterByTypesCached([ "atxHeading", "linePrefix", "setextHeading" ]);
    for (let i = 0; i < headings.length - 1; i++) {
      if (
        (headings[i].type === "linePrefix") &&
        (headings[i + 1].type !== "linePrefix") &&
        (headings[i].startLine === headings[i + 1].startLine)
      ) {
        const { endColumn, startColumn, startLine } = headings[i];
        const length = endColumn - startColumn;
        addErrorContext(
          onError,
          startLine,
          params.lines[startLine - 1],
          true,
          false,
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
