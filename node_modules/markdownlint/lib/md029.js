// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { getDescendantsByType, getTokenTextByType } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const listStyleExamples = {
  "one": "1/1/1",
  "ordered": "1/2/3",
  "zero": "0/0/0"
};

/**
 * Gets the value of an ordered list item prefix token.
 *
 * @param {import("../helpers/micromark.cjs").Token} listItemPrefix List item prefix token.
 * @returns {number} List item value.
 */
function getOrderedListItemValue(listItemPrefix) {
  return Number(getTokenTextByType(listItemPrefix.children, "listItemValue"));
}

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD029", "ol-prefix" ],
  "description": "Ordered list item prefix",
  "tags": [ "ol" ],
  "parser": "micromark",
  "function": function MD029(params, onError) {
    const style = String(params.config.style || "one_or_ordered");
    for (const listOrdered of filterByTypesCached([ "listOrdered" ])) {
      const listItemPrefixes = getDescendantsByType(listOrdered, [ "listItemPrefix" ]);
      let expected = 1;
      let incrementing = false;
      // Check for incrementing number pattern 1/2/3 or 0/1/2
      if (listItemPrefixes.length >= 2) {
        const firstValue = getOrderedListItemValue(listItemPrefixes[0]);
        const secondValue = getOrderedListItemValue(listItemPrefixes[1]);
        if ((secondValue !== 1) || (firstValue === 0)) {
          incrementing = true;
          if (firstValue === 0) {
            expected = 0;
          }
        }
      }
      // Determine effective style
      let listStyle = style;
      if (listStyle === "one_or_ordered") {
        listStyle = incrementing ? "ordered" : "one";
      } else if (listStyle === "zero") {
        expected = 0;
      } else if (listStyle === "one") {
        expected = 1;
      }
      // Validate each list item marker
      for (const listItemPrefix of listItemPrefixes) {
        const actual = getOrderedListItemValue(listItemPrefix);
        addErrorDetailIf(
          onError,
          listItemPrefix.startLine,
          expected,
          actual,
          "Style: " + listStyleExamples[listStyle],
          undefined,
          [ listItemPrefix.startColumn, listItemPrefix.endColumn - listItemPrefix.startColumn ]
        );
        if (listStyle === "ordered") {
          expected++;
        }
      }
    }
  }
};
