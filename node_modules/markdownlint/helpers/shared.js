// @ts-check

"use strict";

// Regular expression for matching common newline characters
// See NEWLINES_RE in markdown-it/lib/rules_core/normalize.js
module.exports.newLineRe = /\r\n?|\n/g;

// Regular expression for matching next lines
module.exports.nextLinesRe = /[\r\n][\s\S]*$/;
