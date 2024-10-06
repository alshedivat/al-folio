// @ts-check

"use strict";

const { addError, emphasisOrStrongStyleFor } = require("../helpers");
const { filterByPredicate, tokenIfType } = require("../helpers/micromark.cjs");

const intrawordRe = /^\w$/;

/**
 * @param {import("./markdownlint").RuleParams} params Rule parameters.
 * @param {import("./markdownlint").RuleOnError} onError Error-reporting callback.
 * @param {import("markdownlint-micromark").TokenType} type Token type.
 * @param {import("markdownlint-micromark").TokenType} typeSequence Token sequence type.
 * @param {"*" | "**"} asterisk Asterisk kind.
 * @param {"_" | "__"} underline Underline kind.
 * @param {"asterisk" | "consistent" | "underscore"} style Style string.
 */
const impl =
  (params, onError, type, typeSequence, asterisk, underline, style = "consistent") => {
    const { lines, parsers } = params;
    const emphasisTokens = filterByPredicate(
      parsers.micromark.tokens,
      (token) => token.type === type,
      (token) => ((token.type === "htmlFlow") ? [] : token.children)
    );
    for (const token of emphasisTokens) {
      const { children } = token;
      const startSequence = tokenIfType(children[0], typeSequence);
      const endSequence = tokenIfType(children[children.length - 1], typeSequence);
      if (startSequence && endSequence) {
        const markupStyle = emphasisOrStrongStyleFor(startSequence.text);
        if (style === "consistent") {
          style = markupStyle;
        }
        if (style !== markupStyle) {
          const underscoreIntraword = (style === "underscore") && (
            intrawordRe.test(
              lines[startSequence.startLine - 1][startSequence.startColumn - 2]
            ) ||
            intrawordRe.test(
              lines[endSequence.endLine - 1][endSequence.endColumn - 1]
            )
          );
          if (!underscoreIntraword) {
            for (const sequence of [ startSequence, endSequence ]) {
              addError(
                onError,
                sequence.startLine,
                `Expected: ${style}; Actual: ${markupStyle}`,
                undefined,
                [ sequence.startColumn, sequence.text.length ],
                {
                  "editColumn": sequence.startColumn,
                  "deleteCount": sequence.text.length,
                  "insertText": (style === "asterisk") ? asterisk : underline
                }
              );
            }
          }
        }
      }
    }
  };

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule[] */
module.exports = [
  {
    "names": [ "MD049", "emphasis-style" ],
    "description": "Emphasis style",
    "tags": [ "emphasis" ],
    "parser": "micromark",
    "function": function MD049(params, onError) {
      return impl(
        params,
        onError,
        "emphasis",
        "emphasisSequence",
        "*",
        "_",
        params.config.style || undefined
      );
    }
  },
  {
    "names": [ "MD050", "strong-style" ],
    "description": "Strong style",
    "tags": [ "emphasis" ],
    "parser": "micromark",
    "function": function MD050(params, onError) {
      return impl(
        params,
        onError,
        "strong",
        "strongSequence",
        "**",
        "__",
        params.config.style || undefined
      );
    }
  }
];
