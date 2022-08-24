# typed-css-modules-rollup-plugin

Generate declaration typings with glob support
This plugin is extended from [typed-css-modules](https://github.com/Quramy/typed-css-modules) plugin.

## Installation

```bash
# yarn
yarn add typed-css-modules-rollup-plugin --dev

# npm
npm i typed-css-modules-rollup-plugin --save-dev
```

## Usage

```js
// rollup.config.js
import dts from "typed-css-modules-rollup-plugin";

export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "cjs",
  },
  plugins: [dts()],
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
