# rollup-plugin-typed-css-modules

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
