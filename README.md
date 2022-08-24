# rollup-plugin-typed-css-modules

![GitHub](https://img.shields.io/github/license/GZLiew/rollup-plugin-typed-css-modules)
[![npm](https://img.shields.io/npm/v/rollup-plugin-typed-css-modules)](https://www.npmjs.com/package/rollup-plugin-typed-css-modules)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FGZLiew%2Frollup-plugin-typed-css-modules%2Fbadge%3Fref%3Dmain&style=for-the-badge)](https://actions-badge.atrox.dev/GZLiew/rollup-plugin-typed-css-modules/goto?ref=main)

Generate declaration typings with glob support
This plugin is extended from [typed-css-modules](https://github.com/Quramy/typed-css-modules) plugin.

## Installation

```bash
# yarn
yarn add rollup-plugin-typed-css-modules --dev

# npm
npm i rollup-plugin-typed-css-modules --save-dev
```

## Usage

```js
// rollup.config.js
import dts from 'rollup-plugin-typed-css-modules';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  plugins: [dts()]
};
```

### Configuration

There are some useful options:

```ts
interface RunOptions {
  pattern?: string;
  outDir?: string;
  watch?: boolean;
  camelCase?: boolean;
  namedExports?: boolean;
  dropExtension?: boolean;
  silent?: boolean;
  listDifferent?: boolean;
}
```

## License

MIT
