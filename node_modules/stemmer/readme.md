# stemmer

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Porter stemming algorithm][source].

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`stemmer(value)`](#stemmervalue)
*   [CLI](#cli)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

This package exposes a stemming algorithm.
That means it gets a certain string (typically an English word), and turns it
into a shorter version (a stem), which can then be compared to other stems
(of other words), to check if they are both (likely) the same term.

## When should I use this?

You’re probably dealing with natural language, and know you need this, if
you’re here!

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install stemmer
```

In Deno with [`esm.sh`][esmsh]:

```js
import {stemmer} from 'https://esm.sh/stemmer@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {stemmer} from 'https://esm.sh/stemmer@2?bundle'
</script>
```

## Use

```js
import {stemmer} from 'stemmer'

stemmer('considerations') // => 'consider'
stemmer('detestable') // => 'detest'
stemmer('vileness') // => 'vile'
```

## API

This package exports the identifier `stemmer`.
There is no default export.

### `stemmer(value)`

Get the stem from a given value.

###### `value`

Value to stem (`string`, required).

##### Returns

Stem for `value` (`string`).

## CLI

```txt
Usage: stemmer [options] <words...>

Porter Stemmer algorithm

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output stems
$ stemmer considerations
# consider

# output stems from stdin
$ echo "detestable vileness" | stemmer
# detest vile
```

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`stmr.c`](https://github.com/wooorm/stmr.c)
    — C API
*   [`stmr`](https://github.com/wooorm/stmr)
    — C CLI
*   [`lancaster-stemmer`](https://github.com/words/lancaster-stemmer)
    — lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — double metaphone algorithm
*   [`soundex-code`](https://github.com/words/soundex-code)
    — soundex algorithm
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — sørensen–dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — syllable count of English words

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/stemmer/workflows/main/badge.svg

[build]: https://github.com/words/stemmer/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/stemmer.svg

[coverage]: https://codecov.io/github/words/stemmer

[downloads-badge]: https://img.shields.io/npm/dm/stemmer.svg

[downloads]: https://www.npmjs.com/package/stemmer

[size-badge]: https://img.shields.io/bundlephobia/minzip/stemmer.svg

[size]: https://bundlephobia.com/result?p=stemmer

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[source]: https://tartarus.org/martin/PorterStemmer

[npm]: https://www.npmjs.com
