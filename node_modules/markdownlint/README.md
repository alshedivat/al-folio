# markdownlint

> A Node.js style checker and lint tool for Markdown/CommonMark files.

[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

## Install

```bash
npm install markdownlint --save-dev
```

## Overview

The [Markdown](https://en.wikipedia.org/wiki/Markdown) markup language
is designed to be easy to read, write, and understand. It succeeds -
and its flexibility is both a benefit and a drawback. Many styles are
possible, so formatting can be inconsistent. Some constructs don't
work well in all parsers and should be avoided. The
[CommonMark](https://commonmark.org/) specification standardizes
parsers - but not authors.

`markdownlint` is a
[static analysis](https://en.wikipedia.org/wiki/Static_program_analysis)
tool for [Node.js](https://nodejs.org/) with a library of rules
to enforce standards and consistency for Markdown files. It was
inspired by - and heavily influenced by - Mark Harrison's
[markdownlint](https://github.com/markdownlint/markdownlint) for
[Ruby](https://www.ruby-lang.org/). The initial rules, rule documentation,
and test cases came directly from that project.

### Related

- CLI
  - [markdownlint-cli][markdownlint-cli] command-line interface for Node.js
    ([works with pre-commit][markdownlint-cli-precommit])
  - [markdownlint-cli2][markdownlint-cli2] command-line interface for Node.js
    ([works with pre-commit][markdownlint-cli2-precommit])
- GitHub
  - [GitHub Action for markdownlint-cli2][markdownlint-cli2-action]
  - [GitHub Super-Linter Action][super-linter]
  - [GitHub Actions problem matcher for
    markdownlint-cli][markdownlint-problem-matcher]
- Editor
  - [vscode-markdownlint extension for VS Code][vscode-markdownlint]
  - [Sublime Text markdownlint for Sublime Text][sublimelinter]
  - [coc-markdownlint extension for Vim/Neovim][coc]
- Tooling
  - [eslint-plugin-markdownlint for the ESLint analyzer][eslint-plugin]
  - [grunt-markdownlint for the Grunt task runner][grunt-markdownlint]
  - [Cake.Markdownlint addin for Cake build automation system][cake]
  - [Lombiq Node.js Extensions for MSBuild (.NET builds)][nodejs-extensions]
- Ruby
  - [markdownlint/mdl gem for Ruby][rubygems-mdl]

[cake]: https://github.com/cake-contrib/Cake.Markdownlint
[coc]: https://github.com/fannheyward/coc-markdownlint
[eslint-plugin]: https://github.com/paweldrozd/eslint-plugin-markdownlint
[grunt-markdownlint]: https://github.com/sagiegurari/grunt-markdownlint
[markdownlint-cli]: https://github.com/igorshubovych/markdownlint-cli
[markdownlint-cli-precommit]: https://github.com/igorshubovych/markdownlint-cli#use-with-pre-commit
[markdownlint-cli2]: https://github.com/DavidAnson/markdownlint-cli2
[markdownlint-cli2-action]: https://github.com/marketplace/actions/markdownlint-cli2-action
[markdownlint-cli2-precommit]: https://github.com/DavidAnson/markdownlint-cli2#pre-commit
[markdownlint-problem-matcher]: https://github.com/xt0rted/markdownlint-problem-matcher
[nodejs-extensions]: https://github.com/Lombiq/NodeJs-Extensions
[rubygems-mdl]: https://rubygems.org/gems/mdl
[sublimelinter]: https://packagecontrol.io/packages/SublimeLinter-contrib-markdownlint
[super-linter]: https://github.com/super-linter/super-linter
[vscode-markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint

### References

The following specifications are considered authoritative in cases of ambiguity:

- [CommonMark](https://spec.commonmark.org/current/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

## Demonstration

[`markdownlint` demo](https://dlaa.me/markdownlint/), an interactive, in-browser
playground for learning and exploring.

## Rules / Aliases

<!-- markdownlint-disable line-length -->

- **[MD001](doc/md001.md)** *heading-increment* - Heading levels should only increment by one level at a time
- **[MD003](doc/md003.md)** *heading-style* - Heading style
- **[MD004](doc/md004.md)** *ul-style* - Unordered list style
- **[MD005](doc/md005.md)** *list-indent* - Inconsistent indentation for list items at the same level
- **[MD007](doc/md007.md)** *ul-indent* - Unordered list indentation
- **[MD009](doc/md009.md)** *no-trailing-spaces* - Trailing spaces
- **[MD010](doc/md010.md)** *no-hard-tabs* - Hard tabs
- **[MD011](doc/md011.md)** *no-reversed-links* - Reversed link syntax
- **[MD012](doc/md012.md)** *no-multiple-blanks* - Multiple consecutive blank lines
- **[MD013](doc/md013.md)** *line-length* - Line length
- **[MD014](doc/md014.md)** *commands-show-output* - Dollar signs used before commands without showing output
- **[MD018](doc/md018.md)** *no-missing-space-atx* - No space after hash on atx style heading
- **[MD019](doc/md019.md)** *no-multiple-space-atx* - Multiple spaces after hash on atx style heading
- **[MD020](doc/md020.md)** *no-missing-space-closed-atx* - No space inside hashes on closed atx style heading
- **[MD021](doc/md021.md)** *no-multiple-space-closed-atx* - Multiple spaces inside hashes on closed atx style heading
- **[MD022](doc/md022.md)** *blanks-around-headings* - Headings should be surrounded by blank lines
- **[MD023](doc/md023.md)** *heading-start-left* - Headings must start at the beginning of the line
- **[MD024](doc/md024.md)** *no-duplicate-heading* - Multiple headings with the same content
- **[MD025](doc/md025.md)** *single-title/single-h1* - Multiple top-level headings in the same document
- **[MD026](doc/md026.md)** *no-trailing-punctuation* - Trailing punctuation in heading
- **[MD027](doc/md027.md)** *no-multiple-space-blockquote* - Multiple spaces after blockquote symbol
- **[MD028](doc/md028.md)** *no-blanks-blockquote* - Blank line inside blockquote
- **[MD029](doc/md029.md)** *ol-prefix* - Ordered list item prefix
- **[MD030](doc/md030.md)** *list-marker-space* - Spaces after list markers
- **[MD031](doc/md031.md)** *blanks-around-fences* - Fenced code blocks should be surrounded by blank lines
- **[MD032](doc/md032.md)** *blanks-around-lists* - Lists should be surrounded by blank lines
- **[MD033](doc/md033.md)** *no-inline-html* - Inline HTML
- **[MD034](doc/md034.md)** *no-bare-urls* - Bare URL used
- **[MD035](doc/md035.md)** *hr-style* - Horizontal rule style
- **[MD036](doc/md036.md)** *no-emphasis-as-heading* - Emphasis used instead of a heading
- **[MD037](doc/md037.md)** *no-space-in-emphasis* - Spaces inside emphasis markers
- **[MD038](doc/md038.md)** *no-space-in-code* - Spaces inside code span elements
- **[MD039](doc/md039.md)** *no-space-in-links* - Spaces inside link text
- **[MD040](doc/md040.md)** *fenced-code-language* - Fenced code blocks should have a language specified
- **[MD041](doc/md041.md)** *first-line-heading/first-line-h1* - First line in a file should be a top-level heading
- **[MD042](doc/md042.md)** *no-empty-links* - No empty links
- **[MD043](doc/md043.md)** *required-headings* - Required heading structure
- **[MD044](doc/md044.md)** *proper-names* - Proper names should have the correct capitalization
- **[MD045](doc/md045.md)** *no-alt-text* - Images should have alternate text (alt text)
- **[MD046](doc/md046.md)** *code-block-style* - Code block style
- **[MD047](doc/md047.md)** *single-trailing-newline* - Files should end with a single newline character
- **[MD048](doc/md048.md)** *code-fence-style* - Code fence style
- **[MD049](doc/md049.md)** *emphasis-style* - Emphasis style
- **[MD050](doc/md050.md)** *strong-style* - Strong style
- **[MD051](doc/md051.md)** *link-fragments* - Link fragments should be valid
- **[MD052](doc/md052.md)** *reference-links-images* - Reference links and images should use a label that is defined
- **[MD053](doc/md053.md)** *link-image-reference-definitions* - Link and image reference definitions should be needed
- **[MD054](doc/md054.md)** *link-image-style* - Link and image style
- **[MD055](doc/md055.md)** *table-pipe-style* - Table pipe style
- **[MD056](doc/md056.md)** *table-column-count* - Table column count
- **[MD058](doc/md058.md)** *blanks-around-tables* - Tables should be surrounded by blank lines

<!-- markdownlint-restore -->

See [Rules.md](doc/Rules.md) for more details.

### Custom Rules

In addition to built-in rules, custom rules can be used to address
project-specific requirements. To find community-developed rules use
[keyword `markdownlint-rule` on npm][markdownlint-rule].
To implement your own rules, refer to [CustomRules.md](doc/CustomRules.md).

[markdownlint-rule]: https://www.npmjs.com/search?q=keywords:markdownlint-rule

## Tags

Tags group related rules and can be used to enable/disable multiple
rules at once.

- **`accessibility`** - `MD045`
- **`atx`** - `MD018`, `MD019`
- **`atx_closed`** - `MD020`, `MD021`
- **`blank_lines`** - `MD012`, `MD022`, `MD031`, `MD032`, `MD047`
- **`blockquote`** - `MD027`, `MD028`
- **`bullet`** - `MD004`, `MD005`, `MD007`, `MD032`
- **`code`** - `MD014`, `MD031`, `MD038`, `MD040`, `MD046`, `MD048`
- **`emphasis`** - `MD036`, `MD037`, `MD049`, `MD050`
- **`hard_tab`** - `MD010`
- **`headings`** - `MD001`, `MD003`, `MD018`, `MD019`, `MD020`, `MD021`,
  `MD022`, `MD023`, `MD024`, `MD025`, `MD026`, `MD036`, `MD041`, `MD043`
- **`hr`** - `MD035`
- **`html`** - `MD033`
- **`images`** - `MD045`, `MD052`, `MD053`, `MD054`
- **`indentation`** - `MD005`, `MD007`, `MD027`
- **`language`** - `MD040`
- **`line_length`** - `MD013`
- **`links`** - `MD011`, `MD034`, `MD039`, `MD042`, `MD051`, `MD052`, `MD053`,
  `MD054`
- **`ol`** - `MD029`, `MD030`, `MD032`
- **`spaces`** - `MD018`, `MD019`, `MD020`, `MD021`, `MD023`
- **`spelling`** - `MD044`
- **`table`** - `MD055`, `MD056`, `MD058`
- **`ul`** - `MD004`, `MD005`, `MD007`, `MD030`, `MD032`
- **`url`** - `MD034`
- **`whitespace`** - `MD009`, `MD010`, `MD012`, `MD027`, `MD028`, `MD030`,
  `MD037`, `MD038`, `MD039`

## Configuration

Text passed to `markdownlint` is parsed as Markdown, analyzed, and any
issues reported. Two kinds of text are ignored by most rules:

- [HTML comments](https://www.w3.org/TR/html5/syntax.html#comments)
- [Front matter](https://jekyllrb.com/docs/frontmatter/) (see
  `options.frontMatter` below)

Rules can be enabled, disabled, and configured via `options.config`
(described below) to define the expected behavior for a set of inputs.
To enable or disable rules at a particular location within a file, add
one of these markers to the appropriate place (HTML comments don't
appear in the final markup):

- Disable all rules: `<!-- markdownlint-disable -->`
- Enable all rules: `<!-- markdownlint-enable -->`
- Disable all rules for the current line: `<!-- markdownlint-disable-line -->`
- Disable all rules for the next line: `<!-- markdownlint-disable-next-line -->`
- Disable one or more rules by name: `<!-- markdownlint-disable MD001 MD005 -->`
- Enable one or more rules by name: `<!-- markdownlint-enable MD001 MD005 -->`
- Disable one or more rules by name for the current line:
  `<!-- markdownlint-disable-line MD001 MD005 -->`
- Disable one or more rules by name for the next line:
  `<!-- markdownlint-disable-next-line MD001 MD005 -->`
- Capture the current rule configuration: `<!-- markdownlint-capture -->`
- Restore the captured rule configuration: `<!-- markdownlint-restore -->`

For example:

```markdown
<!-- markdownlint-disable-next-line no-space-in-emphasis -->
space * in * emphasis
```

Or:

```markdown
space * in * emphasis <!-- markdownlint-disable-line no-space-in-emphasis -->
```

Or:

```markdown
<!-- markdownlint-disable no-space-in-emphasis -->
space * in * emphasis
<!-- markdownlint-enable no-space-in-emphasis -->
```

To temporarily disable rule(s), then restore the former configuration:

```markdown
<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
any violations you want
<!-- markdownlint-restore -->
```

The initial configuration is captured by default (as if every document
began with `<!-- markdownlint-capture -->`), so the pattern above can
be expressed more simply:

```markdown
<!-- markdownlint-disable -->
any violations you want
<!-- markdownlint-restore -->
```

Changes take effect starting with the line a comment is on, so the following
has no effect:

```markdown
space * in * emphasis <!-- markdownlint-disable --> <!-- markdownlint-enable -->
```

To apply changes to an entire file regardless of where the comment is located,
the following syntax is supported:

- Disable all rules: `<!-- markdownlint-disable-file -->`
- Enable all rules: `<!-- markdownlint-enable-file -->`
- Disable one or more rules by name: `<!-- markdownlint-disable-file MD001 -->`
- Enable one or more rules by name: `<!-- markdownlint-enable-file MD001 -->`

This can be used to "hide" `markdownlint` comments at the bottom of a file.

In cases where it is desirable to change the configuration of one or
more rules for a file, the following more advanced syntax is supported:

- Configure: `<!-- markdownlint-configure-file { options.config JSON } -->`

For example:

```markdown
<!-- markdownlint-configure-file { "hr-style": { "style": "---" } } -->
```

or

```markdown
<!-- markdownlint-configure-file
{
  "hr-style": {
    "style": "---"
  },
  "no-trailing-spaces": false
}
-->
```

These changes apply to the entire file regardless of where the comment is
located. Multiple such comments (if present) are applied top-to-bottom. By
default, content of `markdownlint-configure-file` is assumed to be JSON, but
[`options.configParsers`](#optionsconfigparsers) can be used to support
alternate formats.

## API

### Linting

Standard asynchronous API:

```javascript
/**
 * Lint specified Markdown files.
 *
 * @param {Options} options Configuration options.
 * @param {LintCallback} callback Callback (err, result) function.
 * @returns {void}
 */
function markdownlint(options, callback) { ... }
```

Synchronous API (for build scripts, etc.):

```javascript
/**
 * Lint specified Markdown files synchronously.
 *
 * @param {Options} options Configuration options.
 * @returns {LintResults} Results object.
 */
function markdownlint.sync(options) { ... }
```

Promise API (in the `promises` namespace like Node.js's
[`fs` Promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api)):

```javascript
/**
 * Lint specified Markdown files.
 *
 * @param {Options} options Configuration options.
 * @returns {Promise<LintResults>} Results object.
 */
function markdownlint(options) { ... }
```

#### options

Type: `Object`

Configures the function. All properties are optional, but at least one
of `files` or `strings` should be set to provide input.

##### options.config

Type: `Object` mapping `String` to `Boolean | Object`

Configures the rules to use.

Object keys are rule names/aliases; object values are the rule's configuration.
The value `false` disables a rule, `true` enables its default configuration,
and passing an object value customizes that rule. Setting the special `default`
rule to `true` or `false` includes/excludes all rules by default. In the absence
of a configuration object, all rules are enabled. Enabling or disabling a tag
name (ex: `whitespace`) affects all rules having that tag.

The `default` rule is applied first, then keys are processed in order from top
to bottom with later values overriding earlier ones. Keys (including rule names,
aliases, tags, and `default`) are not case-sensitive.

Example:

```json
{
  "default": true,
  "MD003": { "style": "atx_closed" },
  "MD007": { "indent": 4 },
  "no-hard-tabs": false,
  "whitespace": false
}
```

See [.markdownlint.jsonc](schema/.markdownlint.jsonc) and/or
[.markdownlint.yaml](schema/.markdownlint.yaml) for an example
configuration object with all properties set to the default value.

Sets of rules (known as a "style") can be stored separately and loaded
as [JSON](https://en.wikipedia.org/wiki/JSON).

Example of referencing a built-in style from JavaScript:

```javascript
const options = {
  "files": [ "..." ],
  "config": require("style/relaxed.json")
};
```

Example doing so from `.markdownlint.json` via `extends` (more on this below):

```json
{
  "extends": "markdownlint/style/relaxed"
}
```

See the [style](style) directory for more samples.

See [markdownlint-config-schema.json](schema/markdownlint-config-schema.json)
for the [JSON Schema](https://json-schema.org/) of the `options.config`
object.

See [ValidatingConfiguration.md](schema/ValidatingConfiguration.md) for ways to
use the JSON Schema to validate configuration.

For more advanced scenarios, styles can reference and extend other styles.
The `readConfig` and `readConfigSync` functions can be used to read such
styles.

For example, assuming a `base.json` configuration file:

```json
{
  "default": true
}
```

And a `custom.json` configuration file:

```json
{
  "extends": "base.json",
  "line-length": false
}
```

Then code like the following:

```javascript
const options = {
  "config": markdownlint.readConfigSync("./custom.json")
};
```

Merges `custom.json` and `base.json` and is equivalent to:

```javascript
const options = {
  "config": {
    "default": true,
    "line-length": false
  }
};
```

##### options.configParsers

Type: *Optional* `Array` of `Function` taking (`String`) and returning `Object`

Array of functions to parse the content of `markdownlint-configure-file` blocks.

As shown in the [Configuration](#configuration) section, inline comments can be
used to customize the [configuration object](#optionsconfig) for a document. By
default, the `JSON.parse` built-in is used, but custom parsers can be specified.
Content is passed to each parser function until one returns a value (vs.
throwing an exception). As such, strict parsers should come before flexible
ones.

For example:

```javascript
[ JSON.parse, require("toml").parse, require("js-yaml").load ]
```

##### options.customRules

Type: `Array` of `Object`

List of custom rules to include with the default rule set for linting.

Each array element should define a rule. Rules are typically exported
by another package, but can be defined locally.

Example:

```javascript
const extraRules = require("extraRules");
const options = {
  "customRules": [ extraRules.one, extraRules.two ]
};
```

See [CustomRules.md](doc/CustomRules.md) for details about authoring
custom rules.

##### options.files

Type: `Array` of `String`

List of files to lint.

Each array element should be a single file (via relative or absolute path);
[globbing](https://en.wikipedia.org/wiki/Glob_%28programming%29) is the
caller's responsibility.

Example: `[ "one.md", "dir/two.md" ]`

##### options.frontMatter

Type: `RegExp`

Matches any [front matter](https://jekyllrb.com/docs/frontmatter/)
found at the beginning of a file.

Some Markdown content begins with metadata; the default `RegExp` for
this option ignores common forms of "front matter". To match differently,
specify a custom `RegExp` or use the value `null` to disable the feature.

The default value:

```javascript
/((^---\s*$[\s\S]+?^---\s*)|(^\+\+\+\s*$[\s\S]+?^(\+\+\+|\.\.\.)\s*)|(^\{\s*$[\s\S]+?^\}\s*))(\r\n|\r|\n|$)/m
```

Ignores [YAML](https://en.wikipedia.org/wiki/YAML),
[TOML](https://en.wikipedia.org/wiki/TOML), and
[JSON](https://en.wikipedia.org/wiki/JSON) front matter such as:

```text
---
layout: post
title: Title
---
```

Note: Matches must occur at the start of the file.

##### options.fs

Type: `Object` implementing the [file system API][node-fs-api]

In advanced scenarios, it may be desirable to bypass the default file system
API. If a custom file system implementation is provided, `markdownlint` will use
that instead of invoking `require("fs")`.

Note: The only methods called are `readFile` and `readFileSync`.

[node-fs-api]: https://nodejs.org/api/fs.html

##### options.handleRuleFailures

Type: `Boolean`

Catches exceptions thrown during rule processing and reports the problem
as a rule violation.

By default, exceptions thrown by rules (or the library itself) are unhandled
and bubble up the stack to the caller in the conventional manner. By setting
`handleRuleFailures` to `true`, exceptions thrown by failing rules will
be handled by the library and the exception message logged as a rule violation.
This setting can be useful in the presence of (custom) rules that encounter
unexpected syntax and fail. By enabling this option, the linting process
is allowed to continue and report any violations that were found.

##### options.markdownItPlugins

Type: `Array` of `Array` of `Function` and plugin parameters

Specifies additional [`markdown-it` plugins][markdown-it-plugin] to use when
parsing input. Plugins can be used to support additional syntax and features for
advanced scenarios.

[markdown-it-plugin]: https://www.npmjs.com/search?q=keywords:markdown-it-plugin

Each item in the top-level `Array` should be of the form:

```javascript
[ require("markdown-it-plugin"), plugin_param_0, plugin_param_1, ... ]
```

> Note that `markdown-it` plugins are only called when the `markdown-it` parser
> is invoked. None of the built-in rules use the `markdown-it` parser, so
> `markdown-it` plugins will only be invoked when one or more
> [custom rules][custom-rules] that use the `markdown-it` parser are present.

[custom-rules]: #custom-rules

##### options.noInlineConfig

Type: `Boolean`

Disables the use of HTML comments like `<!-- markdownlint-enable -->` to toggle
rules within the body of Markdown content.

By default, properly-formatted inline comments can be used to create exceptions
for parts of a document. Setting `noInlineConfig` to `true` ignores all such
comments.

##### options.resultVersion

Type: `Number`

Specifies which version of the `result` object to return (see the "Usage"
section below for examples).

Passing a `resultVersion` of `0` corresponds to the original, simple format
where each error is identified by rule name and line number. *This is
deprecated.*

Passing a `resultVersion` of `1` corresponds to a detailed format where each
error includes information about the line number, rule name, alias, description,
as well as any additional detail or context that is available. *This is
deprecated.*

Passing a `resultVersion` of `2` corresponds to a detailed format where each
error includes information about the line number, rule names, description, as
well as any additional detail or context that is available. *This is
deprecated.*

Passing a `resultVersion` of `3` corresponds to the detailed version `2` format
with additional information about how to fix automatically-fixable errors. In
this mode, all errors that occur on each line are reported (other versions
report only the first error for each rule). *This is the default.*

##### options.strings

Type: `Object` mapping `String` to `String`

Map of identifiers to strings for linting.

When Markdown content is not available as files, it can be passed as
strings. The keys of the `strings` object are used to identify each
input value in the `result` summary.

Example:

```json
{
  "readme": "# README\n...",
  "changelog": "# CHANGELOG\n..."
}
```

#### callback

Type: `Function` taking (`Error`, `Object`)

Standard completion callback.

#### result

Type: `Object`

Call `result.toString()` for convenience or see below for an example of the
structure of the `result` object. Passing the value `true` to `toString()`
uses rule aliases (ex: `no-hard-tabs`) instead of names (ex: `MD010`).

### Config

The `options.config` configuration object is simple and can be stored in a file
for readability and easy reuse. The `readConfig` and `readConfigSync` functions
load configuration settings and support the `extends` keyword for referencing
other files (see above).

By default, configuration files are parsed as JSON (and named
`.markdownlint.json`). Custom parsers can be provided to handle other formats
like JSONC, YAML, and TOML.

Asynchronous API:

```javascript
/**
 * Read specified configuration file.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[] | ReadConfigCallback} parsers Parsing function.
 * @param {Object} [fs] File system implementation.
 * @param {ReadConfigCallback} [callback] Callback (err, result) function.
 * @returns {void}
 */
function readConfig(file, parsers, fs, callback) { ... }
```

Synchronous API:

```javascript
/**
 * Read specified configuration file synchronously.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[]} [parsers] Parsing function(s).
 * @param {Object} [fs] File system implementation.
 * @returns {Configuration} Configuration object.
 */
function readConfigSync(file, parsers, fs) { ... }
```

Promise API (in the `promises` namespace like Node.js's
[`fs` Promises API](https://nodejs.org/api/fs.html#fs_promises_api)):

```javascript
/**
 * Read specified configuration file.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[]} [parsers] Parsing function(s).
 * @param {Object} [fs] File system implementation.
 * @returns {Promise<Configuration>} Configuration object.
 */
function readConfig(file, parsers, fs) { ... }
```

#### file

Type: `String`

Location of configuration file to read.

The `file` is resolved relative to the current working directory. If an
`extends` key is present once read, its value will be resolved as a path
relative to `file` and loaded recursively. Settings from a file referenced by
`extends` are applied first, then those of `file` are applied on top (overriding
any of the same keys appearing in the referenced file). If either the `file` or
`extends` path begins with the `~` directory, it will act as a placeholder for
the home directory.

#### parsers

Type: *Optional* `Array` of `Function` taking (`String`) and returning `Object`

Array of functions to parse configuration files.

The contents of a configuration file are passed to each parser function until
one of them returns a value (vs. throwing an exception). Consequently, strict
parsers should come before flexible parsers.

For example:

```javascript
[ JSON.parse, require("toml").parse, require("js-yaml").load ]
```

#### fs

Type: *Optional* `Object` implementing the [file system API][file-system-api]

[file-system-api]: https://nodejs.org/api/fs.html

In advanced scenarios, it may be desirable to bypass the default file system
API. If a custom file system implementation is provided, `markdownlint` will use
that instead of invoking `require("fs")`.

Note: The only methods called are `readFile`, `readFileSync`, `access`, and
`accessSync`.

#### callback

Type: `Function` taking (`Error`, `Object`)

Standard completion callback.

#### result

Type: `Object`

Configuration object.

## Usage

Invoke `markdownlint` and use the `result` object's `toString` method:

```javascript
const markdownlint = require("markdownlint");

const options = {
  "files": [ "good.md", "bad.md" ],
  "strings": {
    "good.string": "# good.string\n\nThis string passes all rules.",
    "bad.string": "#bad.string\n\n#This string fails\tsome rules."
  }
};

markdownlint(options, function callback(err, result) {
  if (!err) {
    console.log(result.toString());
  }
});
```

Output:

```text
bad.string: 3: MD010/no-hard-tabs Hard tabs [Column: 19]
bad.string: 1: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#bad.string"]
bad.string: 3: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#This string fails        some rules."]
bad.string: 1: MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "#bad.string"]
bad.md: 3: MD010/no-hard-tabs Hard tabs [Column: 17]
bad.md: 1: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#bad.md"]
bad.md: 3: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#This file fails      some rules."]
bad.md: 1: MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "#bad.md"]
```

Or invoke `markdownlint.sync` for a synchronous call:

```javascript
const result = markdownlint.sync(options);
console.log(result.toString());
```

To examine the `result` object directly:

```javascript
markdownlint(options, function callback(err, result) {
  if (!err) {
    console.dir(result, { "colors": true, "depth": null });
  }
});
```

Output:

```json
{
  "good.md": [],
  "bad.md": [
    { "lineNumber": 3,
      "ruleNames": [ "MD010", "no-hard-tabs" ],
      "ruleDescription": "Hard tabs",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md010.md",
      "errorDetail": "Column: 17",
      "errorContext": null,
      "errorRange": [ 17, 1 ] },
    { "lineNumber": 1,
      "ruleNames": [ "MD018", "no-missing-space-atx" ],
      "ruleDescription": "No space after hash on atx style heading",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md018.md",
      "errorDetail": null,
      "errorContext": "#bad.md",
      "errorRange": [ 1, 2 ] },
    { "lineNumber": 3,
      "ruleNames": [ "MD018", "no-missing-space-atx" ],
      "ruleDescription": "No space after hash on atx style heading",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md018.md",
      "errorDetail": null,
      "errorContext": "#This file fails\tsome rules.",
      "errorRange": [ 1, 2 ] },
    { "lineNumber": 1,
      "ruleNames": [ "MD041", "first-line-heading", "first-line-h1" ],
      "ruleDescription": "First line in a file should be a top-level heading",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md041.md",
      "errorDetail": null,
      "errorContext": "#bad.md",
      "errorRange": null }
  ]
}
```

Integration with the [gulp](https://gulpjs.com/) build system is
straightforward:

```javascript
const gulp = require("gulp");
const through2 = require("through2");
const markdownlint = require("markdownlint");

gulp.task("markdownlint", function task() {
  return gulp.src("*.md", { "read": false })
    .pipe(through2.obj(function obj(file, enc, next) {
      markdownlint(
        { "files": [ file.relative ] },
        function callback(err, result) {
          const resultString = (result || "").toString();
          if (resultString) {
            console.log(resultString);
          }
          next(err, file);
        });
    }));
});
```

Output:

```text
[00:00:00] Starting 'markdownlint'...
bad.md: 3: MD010/no-hard-tabs Hard tabs [Column: 17]
bad.md: 1: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#bad.md"]
bad.md: 3: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#This file fails      some rules."]
bad.md: 1: MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "#bad.md"]
[00:00:00] Finished 'markdownlint' after 10 ms
```

Integration with the [Grunt](https://gruntjs.com/) build system is similar:

```javascript
const markdownlint = require("markdownlint");

module.exports = function wrapper(grunt) {
  grunt.initConfig({
    "markdownlint": {
      "example": {
        "src": [ "*.md" ]
      }
    }
  });

  grunt.registerMultiTask("markdownlint", function task() {
    const done = this.async();
    markdownlint(
      { "files": this.filesSrc },
      function callback(err, result) {
        const resultString = err || ((result || "").toString());
        if (resultString) {
          grunt.fail.warn("\n" + resultString + "\n");
        }
        done(!err || !resultString);
      });
  });
};
```

Output:

```text
Running "markdownlint:example" (markdownlint) task
Warning:
bad.md: 3: MD010/no-hard-tabs Hard tabs [Column: 17]
bad.md: 1: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#bad.md"]
bad.md: 3: MD018/no-missing-space-atx No space after hash on atx style heading [Context: "#This file fails      some rules."]
bad.md: 1: MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "#bad.md"]
 Use --force to continue.
```

### Fixing

Rules that can be fixed automatically include a `fixInfo` property which is
outlined in the [documentation for custom rules](doc/CustomRules.md#authoring).
To apply those fixes more easily, the `applyFixes` method in
[markdownlint-rule-helpers](helpers/README.md#applying-recommended-fixes) may
be used.

## Browser

`markdownlint` also works in the browser.

Generate normal and minified scripts with:

```bash
npm run build-demo
```

Then reference `markdown-it` and `markdownlint`:

```html
<script src="demo/markdown-it.min.js"></script>
<script src="demo/markdownlint-browser.min.js"></script>
```

And call it like so:

```javascript
const options = {
  "strings": {
    "content": "Some Markdown to lint."
  }
};
const results = window.markdownlint.sync(options).toString();
```

## Examples

For ideas how to integrate `markdownlint` into your workflow, refer to the
following projects or one of the tools in the [Related section](#related):

- [.NET Documentation][dot-net-doc] ([Search repository][dot-net-doc-search])
- [ally.js][ally-js] ([Search repository][ally-js-search])
- [Apache Airflow][airflow] ([Search repository][airflow-search])
- [Boostnote][boostnote] ([Search repository][boostnote-search])
- [CodiMD][codimd] ([Search repository][codimd-search])
- [Electron][electron] ([Search repository][electron-search])
- [ESLint][eslint] ([Search repository][eslint-search])
- [Garden React Components][garden] ([Search repository][garden-search])
- [MDN Web Docs][mdn] ([Search repository][mdn-search])
- [MkDocs][mkdocs] ([Search repository][mkdocs-search])
- [Mocha][mocha] ([Search repository][mocha-search])
- [Pi-hole documentation][pi-hole] ([Search repository][pi-hole-search])
- [Reactable][reactable] ([Search repository][reactable-search])
- [V8][v8] ([Search repository][v8-search])
- [webhint][webhint] ([Search repository][webhint-search])
- [webpack][webpack] ([Search repository][webpack-search])
- [WordPress][wordpress] ([Search repository][wordpress-search])

For more advanced integration scenarios:

- [GitHub Docs content linter][content-linter]
- [GitHub's `markdownlint-github` repository][markdownlint-github]

[ally-js]: https://allyjs.io/
[ally-js-search]: https://github.com/medialize/ally.js/search?q=markdownlint
[airflow]: https://airflow.apache.org
[airflow-search]: https://github.com/apache/airflow/search?q=markdownlint
[boostnote]: https://boostnote.io/
[boostnote-search]: https://github.com/BoostIO/Boostnote/search?q=markdownlint
[codimd]: https://github.com/hackmdio/codimd
[codimd-search]: https://github.com/hackmdio/codimd/search?q=markdownlint
[content-linter]: https://docs.github.com/en/contributing/collaborating-on-github-docs/using-the-content-linter
[dot-net-doc]: https://docs.microsoft.com/en-us/dotnet/
[dot-net-doc-search]: https://github.com/dotnet/docs/search?q=markdownlint
[electron]: https://www.electronjs.org
[electron-search]: https://github.com/electron/electron/search?q=markdownlint
[eslint]: https://eslint.org/
[eslint-search]: https://github.com/eslint/eslint/search?q=markdownlint
[garden]: https://zendeskgarden.github.io/react-components/
[garden-search]: https://github.com/zendeskgarden/react-components/search?q=markdownlint
[markdownlint-github]: https://github.com/github/markdownlint-github
[mdn]: https://developer.mozilla.org/
[mdn-search]: https://github.com/mdn/content/search?q=markdownlint
[mkdocs]: https://www.mkdocs.org/
[mkdocs-search]: https://github.com/mkdocs/mkdocs/search?q=markdownlint
[mocha]: https://mochajs.org/
[mocha-search]: https://github.com/mochajs/mocha/search?q=markdownlint
[pi-hole]: https://docs.pi-hole.net
[pi-hole-search]: https://github.com/pi-hole/docs/search?q=markdownlint
[reactable]: https://glittershark.github.io/reactable/
[reactable-search]: https://github.com/glittershark/reactable/search?q=markdownlint
[v8]: https://v8.dev/
[v8-search]: https://github.com/v8/v8.dev/search?q=markdownlint
[webhint]: https://webhint.io/
[webhint-search]: https://github.com/webhintio/hint/search?q=markdownlint
[webpack]: https://webpack.js.org/
[webpack-search]: https://github.com/webpack/webpack.js.org/search?q=markdownlint
[wordpress]: https://wordpress.org/gutenberg/
[wordpress-search]: https://github.com/WordPress/gutenberg/search?q=markdownlint

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Releasing

See [ReleaseProcess.md](doc/ReleaseProcess.md) for more information.

## History

See [CHANGELOG.md](CHANGELOG.md).

[npm-image]: https://img.shields.io/npm/v/markdownlint.svg
[npm-url]: https://www.npmjs.com/package/markdownlint
[license-image]: https://img.shields.io/npm/l/markdownlint.svg
[license-url]: https://opensource.org/licenses/MIT
