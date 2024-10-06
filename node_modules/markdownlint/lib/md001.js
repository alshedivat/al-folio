// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { getHeadingLevel } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD001", "heading-increment" ],
  "description": "Heading levels should only increment by one level at a time",
  "tags": [ "headings" ],
  "parser": "micromark",
  "function": function MD001(params, onError) {
    let prevLevel = Number.MAX_SAFE_INTEGER;
    for (const heading of filterByTypesCached([ "atxHeading", "setextHeading" ])) {
      const level = getHeadingLevel(heading);
      if (level > prevLevel) {
        addErrorDetailIf(
          onError,
          heading.startLine,
          `h${prevLevel + 1}`,
          `h${level}`
        );
      }
      prevLevel = level;
    }
  }
};
