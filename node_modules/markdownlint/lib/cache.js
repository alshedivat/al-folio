// @ts-check

"use strict";

const helpers = require("../helpers");
const { filterByTypes } = require("../helpers/micromark.cjs");

/** @type {Map<string, object>} */
const map = new Map();
// eslint-disable-next-line no-undef-init
let params = undefined;

/**
 * Initializes (resets) the cache.
 *
 * @param {import("./markdownlint").RuleParams} [p] Rule parameters object.
 * @returns {void}
 */
function initialize(p) {
  map.clear();
  params = p;
}

/**
 * Gets a cached object value - computes it and caches it.
 *
 * @param {string} name Cache object name.
 * @param {Function} getValue Getter for object value.
 * @returns {Object} Object value.
 */
function getCached(name, getValue) {
  if (map.has(name)) {
    return map.get(name);
  }
  const value = getValue();
  map.set(name, value);
  return value;
}

/**
 * Filters a list of Micromark tokens by type and caches the result.
 *
 * @param {import("./markdownlint").MicromarkTokenType[]} types Types to allow.
 * @param {boolean} [htmlFlow] Whether to include htmlFlow content.
 * @returns {import("./markdownlint").MicromarkToken[]} Filtered tokens.
 */
function filterByTypesCached(types, htmlFlow) {
  return getCached(
    types.join("|"),
    () => filterByTypes(params.parsers.micromark.tokens, types, htmlFlow)
  );
}

/**
 * Gets a reference link and image data object.
 *
 * @returns {Object} Reference link and image data object.
 */
function getReferenceLinkImageData() {
  return getCached(
    getReferenceLinkImageData.name,
    () => helpers.getReferenceLinkImageData(params.parsers.micromark.tokens)
  );
}

module.exports = {
  initialize,
  filterByTypesCached,
  getReferenceLinkImageData
};
