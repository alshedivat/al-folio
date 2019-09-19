# Primer Utilities

[![npm version](https://img.shields.io/npm/v/primer-utilities.svg)](https://www.npmjs.org/package/primer-utilities)
[![Build Status](https://travis-ci.org/primer/primer.svg?branch=master)](https://travis-ci.org/primer/primer)

> There are a handful of utilities in Primer for quick behaviors, floats, colors, alignment, and more.

This repository is a module of the full [primer][primer] repository.

## Install

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `primer-utilities` with this command.

```
$ npm install --save primer-utilities
```

## Usage

The source files included are written in [Sass][sass] (`scss`) You can simply point your sass `include-path` at your `node_modules` directory and import it like this.

```scss
@import "primer-utilities/index.scss";
```

You can also import specific portions of the module by importing those partials from the `/lib/` folder. _Make sure you import any requirements along with the modules._

## Build

For a compiled **css** version of this module, a npm script is included that will output a css version to `build/build.css` The built css file is also included in the npm package.

```
$ npm run build
```

## Documentation

You can read more about utilities in the [docs folder](./docs/).

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)

[primer]: https://github.com/primer/primer
[docs]: http://primer.github.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
