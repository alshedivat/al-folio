// @ts-check

"use strict";

const { addError, withinAnyRange } = require("../helpers");
const { addRangeToSet, getExclusionsForToken } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const reversedLinkRe =
  /(^|[^\\])\(([^()]+)\)\[([^\]^][^\]]*)\](?!\()/g;

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD011", "no-reversed-links" ],
  "description": "Reversed link syntax",
  "tags": [ "links" ],
  "parser": "micromark",
  "function": function MD011(params, onError) {
    const codeBlockLineNumbers = new Set();
    for (const codeBlock of filterByTypesCached([ "codeFenced", "codeIndented" ])) {
      addRangeToSet(codeBlockLineNumbers, codeBlock.startLine, codeBlock.endLine);
    }
    const exclusions = [];
    for (const codeText of filterByTypesCached([ "codeText" ])) {
      exclusions.push(...getExclusionsForToken(params.lines, codeText));
    }
    for (const [ lineIndex, line ] of params.lines.entries()) {
      if (!codeBlockLineNumbers.has(lineIndex + 1)) {
        let match = null;
        while ((match = reversedLinkRe.exec(line)) !== null) {
          const [ reversedLink, preChar, linkText, linkDestination ] = match;
          const index = match.index + preChar.length;
          const length = match[0].length - preChar.length;
          if (
            !linkText.endsWith("\\") &&
            !linkDestination.endsWith("\\") &&
            !withinAnyRange(exclusions, lineIndex + 1, index, length)
          ) {
            addError(
              onError,
              lineIndex + 1,
              reversedLink.slice(preChar.length),
              undefined,
              [ index + 1, length ],
              {
                "editColumn": index + 1,
                "deleteCount": length,
                "insertText": `[${linkText}](${linkDestination})`
              }
            );
          }
        }
      }
    }
  }
};
