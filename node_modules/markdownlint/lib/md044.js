// @ts-check

"use strict";

const { addErrorDetailIf, escapeForRegExp, withinAnyRange } =
  require("../helpers");
const { filterByPredicate, filterByTypes, parse } =
  require("../helpers/micromark.cjs");

const ignoredChildTypes = new Set(
  [ "codeFencedFence", "definition", "reference", "resource" ]
);

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD044", "proper-names" ],
  "description": "Proper names should have the correct capitalization",
  "tags": [ "spelling" ],
  "parser": "micromark",
  "function": function MD044(params, onError) {
    let names = params.config.names;
    names = Array.isArray(names) ? names : [];
    names.sort((a, b) => (b.length - a.length) || a.localeCompare(b));
    if (names.length === 0) {
      // Nothing to check; avoid doing any work
      return;
    }
    const codeBlocks = params.config.code_blocks;
    const includeCodeBlocks =
      (codeBlocks === undefined) ? true : !!codeBlocks;
    const htmlElements = params.config.html_elements;
    const includeHtmlElements =
      (htmlElements === undefined) ? true : !!htmlElements;
    const scannedTypes = new Set([ "data" ]);
    if (includeCodeBlocks) {
      scannedTypes.add("codeFlowValue");
      scannedTypes.add("codeTextData");
    }
    if (includeHtmlElements) {
      scannedTypes.add("htmlFlowData");
      scannedTypes.add("htmlTextData");
    }
    const contentTokens =
      filterByPredicate(
        params.parsers.micromark.tokens,
        (token) => scannedTypes.has(token.type),
        (token) => (
          token.children.filter((t) => !ignoredChildTypes.has(t.type))
        )
      );
    const exclusions = [];
    const autoLinked = new Set();
    for (const name of names) {
      const escapedName = escapeForRegExp(name);
      const startNamePattern = /^\W/.test(name) ? "" : "\\b_*";
      const endNamePattern = /\W$/.test(name) ? "" : "_*\\b";
      const namePattern =
        `(${startNamePattern})(${escapedName})${endNamePattern}`;
      const nameRe = new RegExp(namePattern, "gi");
      for (const token of contentTokens) {
        let match = null;
        while ((match = nameRe.exec(token.text)) !== null) {
          const [ , leftMatch, nameMatch ] = match;
          const index = token.startColumn - 1 + match.index + leftMatch.length;
          const length = nameMatch.length;
          const lineIndex = token.startLine - 1;
          if (
            !withinAnyRange(exclusions, lineIndex, index, length) &&
            !names.includes(nameMatch)
          ) {
            let urlRanges = [];
            if (!autoLinked.has(token)) {
              urlRanges = filterByTypes(
                parse(token.text),
                [ "literalAutolink" ]
              ).map(
                (t) => [
                  lineIndex,
                  token.startColumn - 1 + t.startColumn - 1,
                  t.endColumn - t.startColumn
                ]
              );
              exclusions.push(...urlRanges);
              autoLinked.add(token);
            }
            if (!withinAnyRange(urlRanges, lineIndex, index, length)) {
              const column = index + 1;
              addErrorDetailIf(
                onError,
                token.startLine,
                name,
                nameMatch,
                undefined,
                undefined,
                [ column, length ],
                {
                  "editColumn": column,
                  "deleteCount": length,
                  "insertText": name
                }
              );
            }
          }
          exclusions.push([ lineIndex, index, length ]);
        }
      }
    }
  }
};
