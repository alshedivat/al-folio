// @ts-check

"use strict";

const { addError, nextLinesRe } = require("../helpers");
const { getHtmlTagInfo } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD033", "no-inline-html" ],
  "description": "Inline HTML",
  "tags": [ "html" ],
  "parser": "micromark",
  "function": function MD033(params, onError) {
    let allowedElements = params.config.allowed_elements;
    allowedElements = Array.isArray(allowedElements) ? allowedElements : [];
    allowedElements = allowedElements.map((element) => element.toLowerCase());
    for (const token of filterByTypesCached([ "htmlText" ], true)) {
      const htmlTagInfo = getHtmlTagInfo(token);
      if (
        htmlTagInfo &&
        !htmlTagInfo.close &&
        !allowedElements.includes(htmlTagInfo.name.toLowerCase())
      ) {
        const range = [
          token.startColumn,
          token.text.replace(nextLinesRe, "").length
        ];
        addError(
          onError,
          token.startLine,
          "Element: " + htmlTagInfo.name,
          undefined,
          range
        );
      }
    }
  }
};
