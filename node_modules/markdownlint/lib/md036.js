// @ts-check

"use strict";

const { addErrorContext, allPunctuation } = require("../helpers");
const { matchAndGetTokensByType } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

/** @typedef {import("../helpers/micromark.cjs").TokenType} TokenType */
/** @type {Map<TokenType, TokenType[]>} */
const emphasisAndChildrenTypes = new Map([
  [ "emphasis", [ "emphasisSequence", "emphasisText", "emphasisSequence" ] ],
  [ "strong", [ "strongSequence", "strongText", "strongSequence" ] ]
]);

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD036", "no-emphasis-as-heading" ],
  "description": "Emphasis used instead of a heading",
  "tags": [ "headings", "emphasis" ],
  "parser": "micromark",
  "function": function MD036(params, onError) {
    let punctuation = params.config.punctuation;
    punctuation = String((punctuation === undefined) ? allPunctuation : punctuation);
    const punctuationRe = new RegExp("[" + punctuation + "]$");
    const paragraphTokens =
      filterByTypesCached([ "paragraph" ]).
        filter((token) =>
          (token.parent?.type === "content") && !token.parent?.parent && (token.children.length === 1)
        );
    for (const paragraphToken of paragraphTokens) {
      const childToken = paragraphToken.children[0];
      for (const [ emphasisType, emphasisChildrenTypes ] of emphasisAndChildrenTypes) {
        if (childToken.type === emphasisType) {
          const matchingTokens = matchAndGetTokensByType(childToken.children, emphasisChildrenTypes);
          if (matchingTokens) {
            const textToken = matchingTokens[1];
            if (
              (textToken.children.length === 1) &&
              (textToken.children[0].type === "data") &&
              !punctuationRe.test(textToken.text)
            ) {
              addErrorContext(onError, textToken.startLine, textToken.text);
            }
          }
        }
      }
    }
  }
};
