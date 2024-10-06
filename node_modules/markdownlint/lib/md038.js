// @ts-check

"use strict";

const { addErrorContext } = require("../helpers");
const { tokenIfType } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const leftSpaceRe = /^\s(?:[^`]|$)/;
const rightSpaceRe = /[^`]\s$/;
const trimCodeText = (text, start, end) => {
  text = text.replace(/^\s+$/, "");
  if (start) {
    text = text.replace(/^\s+?(\s`|\S)/, "$1");
  }
  if (end) {
    text = text.replace(/(`\s|\S)\s+$/, "$1");
  }
  return text;
};

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD038", "no-space-in-code" ],
  "description": "Spaces inside code span elements",
  "tags": [ "whitespace", "code" ],
  "parser": "micromark",
  "function": function MD038(params, onError) {
    const codeTexts = filterByTypesCached([ "codeText" ]);
    for (const codeText of codeTexts) {
      const { children } = codeText;
      const first = 0;
      const last = children.length - 1;
      const startSequence = tokenIfType(children[first], "codeTextSequence");
      const endSequence = tokenIfType(children[last], "codeTextSequence");
      const startData =
        tokenIfType(children[first + 1], "codeTextData") ||
        tokenIfType(children[first + 2], "codeTextData");
      const endData =
        tokenIfType(children[last - 1], "codeTextData") ||
        tokenIfType(children[last - 2], "codeTextData");
      if (startSequence && endSequence && startData && endData) {
        const spaceLeft = leftSpaceRe.test(startData.text);
        const spaceRight = rightSpaceRe.test(endData.text);
        if (spaceLeft || spaceRight) {
          let lineNumber = startSequence.startLine;
          let range = null;
          let fixInfo = null;
          if (startSequence.startLine === endSequence.endLine) {
            range = [
              startSequence.startColumn,
              endSequence.endColumn - startSequence.startColumn
            ];
            fixInfo = {
              "editColumn": startSequence.endColumn,
              "deleteCount": endSequence.startColumn - startSequence.endColumn,
              "insertText": trimCodeText(startData.text, true, true)
            };
          } else if (spaceLeft && (startSequence.endLine === startData.startLine)) {
            range = [
              startSequence.startColumn,
              startData.endColumn - startSequence.startColumn
            ];
            fixInfo = {
              "editColumn": startSequence.endColumn,
              "deleteCount": startData.endColumn - startData.startColumn,
              "insertText": trimCodeText(startData.text, true, false)
            };
          } else if (spaceRight && (endData.text.trim().length > 0)) {
            lineNumber = endSequence.endLine;
            range = [
              endData.startColumn,
              endSequence.endColumn - endData.startColumn
            ];
            fixInfo = {
              "editColumn": endData.startColumn,
              "deleteCount": endData.endColumn - endData.startColumn,
              "insertText": trimCodeText(endData.text, false, true)
            };
          }
          if (range) {
            const context = params
              .lines[lineNumber - 1]
              .substring(range[0] - 1, range[0] - 1 + range[1]);
            addErrorContext(
              onError,
              lineNumber,
              context,
              spaceLeft,
              spaceRight,
              range,
              fixInfo
            );
          }
        }
      }
    }
  }
};
