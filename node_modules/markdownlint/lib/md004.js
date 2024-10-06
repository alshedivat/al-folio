// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { getDescendantsByType, getTokenParentOfType } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const markerToStyle = {
  "-": "dash",
  "+": "plus",
  "*": "asterisk"
};
const styleToMarker = {
  "dash": "-",
  "plus": "+",
  "asterisk": "*"
};
const differentItemStyle = {
  "dash": "plus",
  "plus": "asterisk",
  "asterisk": "dash"
};
const validStyles = new Set([
  "asterisk",
  "consistent",
  "dash",
  "plus",
  "sublist"
]);

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD004", "ul-style" ],
  "description": "Unordered list style",
  "tags": [ "bullet", "ul" ],
  "parser": "micromark",
  "function": function MD004(params, onError) {
    const style = String(params.config.style || "consistent");
    let expectedStyle = validStyles.has(style) ? style : "dash";
    const nestingStyles = [];
    for (const listUnordered of filterByTypesCached([ "listUnordered" ])) {
      let nesting = 0;
      if (style === "sublist") {
        /** @type {import("../helpers/micromark.cjs").Token | null} */
        let parent = listUnordered;
        // @ts-ignore
        while ((parent = getTokenParentOfType(parent, [ "listOrdered", "listUnordered" ]))) {
          nesting++;
        }
      }
      const listItemMarkers = getDescendantsByType(listUnordered, [ "listItemPrefix", "listItemMarker" ]);
      for (const listItemMarker of listItemMarkers) {
        const itemStyle = markerToStyle[listItemMarker.text];
        if (style === "sublist") {
          if (!nestingStyles[nesting]) {
            nestingStyles[nesting] =
              (itemStyle === nestingStyles[nesting - 1]) ?
                differentItemStyle[itemStyle] :
                itemStyle;
          }
          expectedStyle = nestingStyles[nesting];
        } else if (expectedStyle === "consistent") {
          expectedStyle = itemStyle;
        }
        const column = listItemMarker.startColumn;
        const length = listItemMarker.endColumn - listItemMarker.startColumn;
        addErrorDetailIf(
          onError,
          listItemMarker.startLine,
          expectedStyle,
          itemStyle,
          undefined,
          undefined,
          [ column, length ],
          {
            "editColumn": column,
            "deleteCount": length,
            "insertText": styleToMarker[expectedStyle]
          }
        );
      }
    }
  }
};
