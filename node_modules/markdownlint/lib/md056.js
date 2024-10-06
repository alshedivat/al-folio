// @ts-check

"use strict";

const { addErrorDetailIf } = require("../helpers");
const { filterByTypes } = require("../helpers/micromark.cjs");
const { filterByTypesCached } = require("./cache");

const makeRange = (start, end) => [ start, end - start + 1 ];

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD056", "table-column-count" ],
  "description": "Table column count",
  "tags": [ "table" ],
  "parser": "micromark",
  "function": function MD056(params, onError) {
    const tables = filterByTypesCached([ "table" ]);
    for (const table of tables) {
      const rows = filterByTypes(
        table.children,
        [ "tableDelimiterRow", "tableRow" ]
      );
      let expectedCount = 0;
      for (const row of rows) {
        const cells = filterByTypes(
          row.children,
          [ "tableData", "tableDelimiter", "tableHeader" ]
        );
        const actualCount = cells.length;
        expectedCount ||= actualCount;
        // eslint-disable-next-line no-undef-init
        let detail = undefined;
        // eslint-disable-next-line no-undef-init
        let range = undefined;
        if (actualCount < expectedCount) {
          detail = "Too few cells, row will be missing data";
          range = [ row.endColumn - 1, 1 ];
        } else if (expectedCount < actualCount) {
          detail = "Too many cells, extra data will be missing";
          range = makeRange(cells[expectedCount].startColumn, row.endColumn - 1);
        }
        addErrorDetailIf(
          onError,
          row.endLine,
          expectedCount,
          actualCount,
          detail,
          undefined,
          range
        );
      }
    }
  }
}
