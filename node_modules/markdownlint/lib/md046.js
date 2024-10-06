// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { filterByTypesCached } = require("./cache");

const tokenTypeToStyle = {
  "codeFenced": "fenced",
  "codeIndented": "indented"
};

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD046", "code-block-style" ],
  "description": "Code block style",
  "tags": [ "code" ],
  "parser": "micromark",
  "function": function MD046(params, onError) {
    let expectedStyle = String(params.config.style || "consistent");
    for (const token of filterByTypesCached([ "codeFenced", "codeIndented" ])) {
      const { startLine, type } = token;
      if (expectedStyle === "consistent") {
        expectedStyle = tokenTypeToStyle[type];
      }
      addErrorDetailIf(
        onError,
        startLine,
        expectedStyle,
        tokenTypeToStyle[type]);
    }
  }
};
