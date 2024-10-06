// @ts-check

"use strict";

const { addErrorContext, nextLinesRe } = require("../helpers");
const { filterByPredicate, getTokenTextByType } = require("../helpers/micromark.cjs");
const { getReferenceLinkImageData, filterByTypesCached } = require("./cache");

const backslashEscapeRe = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const removeBackslashEscapes = (text) => text.replace(backslashEscapeRe, "$1");
const autolinkDisallowedRe = /[ <>]/;
const autolinkAble = (destination) => {
  try {
    // eslint-disable-next-line no-new
    new URL(destination);
  } catch {
    // Not an absolute URL
    return false;
  }
  return !autolinkDisallowedRe.test(destination);
};

// eslint-disable-next-line jsdoc/valid-types
/** @type import("./markdownlint").Rule */
module.exports = {
  "names": [ "MD054", "link-image-style" ],
  "description": "Link and image style",
  "tags": [ "images", "links" ],
  "parser": "micromark",
  "function": (params, onError) => {
    const config = params.config;
    const autolink = (config.autolink === undefined) || !!config.autolink;
    const inline = (config.inline === undefined) || !!config.inline;
    const full = (config.full === undefined) || !!config.full;
    const collapsed = (config.collapsed === undefined) || !!config.collapsed;
    const shortcut = (config.shortcut === undefined) || !!config.shortcut;
    const urlInline = (config.url_inline === undefined) || !!config.url_inline;
    if (autolink && inline && full && collapsed && shortcut && urlInline) {
      // Everything allowed, nothing to check
      return;
    }
    const { definitions } = getReferenceLinkImageData();
    const links = filterByTypesCached([ "autolink", "image", "link" ]);
    for (const link of links) {
      let label = null;
      let destination = null;
      const {
        children, endColumn, endLine, startColumn, startLine, text, type
      } = link;
      const image = (type === "image");
      let isError = false;
      if (type === "autolink") {
        // link kind is an autolink
        destination = getTokenTextByType(children, "autolinkProtocol");
        label = destination;
        isError = !autolink;
      } else {
        // link type is "image" or "link"
        const descendents = filterByPredicate(children);
        label = getTokenTextByType(descendents, "labelText");
        destination =
          getTokenTextByType(descendents, "resourceDestinationString");
        if (destination) {
          // link kind is an inline link
          const title = getTokenTextByType(descendents, "resourceTitleString");
          isError = !inline || (
            !urlInline &&
            autolink &&
            !image &&
            !title &&
            (label === destination) &&
            autolinkAble(destination)
          );
        } else {
          // link kind is a full/collapsed/shortcut reference link
          const isShortcut = !children.some((t) => t.type === "reference");
          const referenceString = getTokenTextByType(descendents, "referenceString");
          const isCollapsed = (referenceString === null);
          const definition = definitions.get(referenceString || label);
          destination = definition && definition[1];
          isError = destination &&
            (isShortcut ? !shortcut : (isCollapsed ? !collapsed : !full));
        }
      }
      if (isError) {
        // eslint-disable-next-line no-undef-init
        let range = undefined;
        let fixInfo = null;
        if (startLine === endLine) {
          range = [ startColumn, endColumn - startColumn ];
          let insertText = null;
          const canInline = (inline && label);
          const canAutolink = (autolink && !image && autolinkAble(destination));
          if (canInline && (urlInline || !canAutolink)) {
            // Most useful form
            const prefix = (image ? "!" : "");
            // @ts-ignore
            const escapedLabel = label.replace(/[[\]]/g, "\\$&");
            const escapedDestination = destination.replace(/[()]/g, "\\$&");
            insertText = `${prefix}[${escapedLabel}](${escapedDestination})`;
          } else if (canAutolink) {
            // Simplest form
            insertText = `<${removeBackslashEscapes(destination)}>`;
          }
          if (insertText) {
            fixInfo = {
              "editColumn": range[0],
              insertText,
              "deleteCount": range[1]
            };
          }
        }
        addErrorContext(
          onError,
          startLine,
          text.replace(nextLinesRe, ""),
          undefined,
          undefined,
          range,
          fixInfo
        );
      }
    }
  }
};
