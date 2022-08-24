import fs from 'fs-extra';
import { rollup } from 'rollup';

import dts from '../src';

process.chdir(`${__dirname}/fixtures`);

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function readFile(path) {
//   return fs.readFile(path, 'utf-8');
// }

async function build(pluginOptions) {
  await rollup({
    input: 'src/index.ts',
    plugins: [dts(pluginOptions)]
  });
}

afterEach(async () => {
  await fs.remove('build');
  await fs.remove('dist');
});

describe('typed css modules', () => {
  test('No config passed', async () => {
    await build();

    expect(await fs.pathExists('src/hello.module.css.d.ts')).toBe(true);
    expect(await fs.pathExists('dist/hello.module.css.d.ts')).toBe(true);
  });

  test('Files', async () => {
    await build({
      searchDir: 'src',
      outDir: 'dist',
      pattern: '**/*.module.css'
    });

    expect(await fs.pathExists('src/hello.module.css.d.ts')).toBe(true);
    expect(await fs.pathExists('dist/hello.module.css.d.ts')).toBe(true);
  });

  // test('Throw if target is not an object', async () => {
  //   await expect(
  //     build({
  //       targets: ['src/assets/asset-1.js']
  //     })
  //   ).rejects.toThrow("'src/assets/asset-1.js' target must be an object");
  // });
  //
  // test("Throw if target object doesn't have required properties", async () => {
  //   await expect(
  //     build({
  //       targets: [{ src: 'src/assets/asset-1.js' }]
  //     })
  //   ).rejects.toThrow(
  //     '{ src: \'src/assets/asset-1.js\' } target must have "src" and "dest" properties'
  //   );
  // });
  //
  // test('Throw if target object "rename" property is of wrong type', async () => {
  //   await expect(
  //     build({
  //       targets: [{ src: 'src/assets/asset-1.js', dest: 'dist', rename: [] }]
  //     })
  //   ).rejects.toThrow(
  //     "{ src: 'src/assets/asset-1.js', dest: 'dist', rename: [] }" +
  //       ' target\'s "rename" property must be a string or a function'
  //   );
  // });
  //
  // test('Rename target', async () => {
  //   await build({
  //     targets: [
  //       {
  //         src: 'src/assets/asset-1.js',
  //         dest: 'dist',
  //         rename: 'asset-1-renamed.js'
  //       },
  //       { src: 'src/assets/css', dest: 'dist', rename: 'css-renamed' },
  //       {
  //         src: 'src/assets/css/*',
  //         dest: 'dist/css-multiple',
  //         rename: 'css-1.css'
  //       },
  //       {
  //         src: 'src/assets/asset-2.js',
  //         dest: 'dist',
  //         rename: (name, extension) => `${name}-renamed.${extension}`
  //       },
  //       {
  //         src: 'src/assets/scss',
  //         dest: 'dist',
  //         rename: (name) => `${name}-renamed`
  //       },
  //       {
  //         src: 'src/assets/scss/*',
  //         dest: 'dist/scss-multiple',
  //         rename: (name, extension) =>
  //           extension ? `${name}-renamed.${extension}` : `${name}-renamed`
  //       }
  //     ]
  //   });
  //
  //   expect(await fs.pathExists('dist/asset-1-renamed.js')).toBe(true);
  //   expect(await fs.pathExists('dist/css-renamed')).toBe(true);
  //   expect(await fs.pathExists('dist/css-renamed/css-1.css')).toBe(true);
  //   expect(await fs.pathExists('dist/css-renamed/css-2.css')).toBe(true);
  //   expect(await fs.pathExists('dist/css-multiple/css-1.css')).toBe(true);
  //   expect(await fs.pathExists('dist/css-multiple/css-2.css')).toBe(false);
  //   expect(await fs.pathExists('dist/asset-2-renamed.js')).toBe(true);
  //   expect(await fs.pathExists('dist/scss-renamed')).toBe(true);
  //   expect(await fs.pathExists('dist/scss-renamed/scss-1.scss')).toBe(true);
  //   expect(await fs.pathExists('dist/scss-renamed/scss-2.scss')).toBe(true);
  //   expect(await fs.pathExists('dist/scss-renamed/nested')).toBe(true);
  //   expect(await fs.pathExists('dist/scss-renamed/nested/scss-3.scss')).toBe(
  //     true
  //   );
  //   expect(await fs.pathExists('dist/scss-multiple/scss-1-renamed.scss')).toBe(
  //     true
  //   );
  //   expect(await fs.pathExists('dist/scss-multiple/scss-2-renamed.scss')).toBe(
  //     true
  //   );
  //   expect(await fs.pathExists('dist/scss-multiple/nested-renamed')).toBe(true);
  //   expect(
  //     await fs.pathExists('dist/scss-multiple/nested-renamed/scss-3.scss')
  //   ).toBe(true);
  // });
  //
  // test('Throw if transform target is not a file', async () => {
  //   await expect(
  //     build({
  //       targets: [
  //         {
  //           src: 'src/assets/css',
  //           dest: 'dist',
  //           transform: (contents) => contents.toString().replace('blue', 'red')
  //         }
  //       ]
  //     })
  //   ).rejects.toThrow(
  //     '"transform" option works only on files: \'src/assets/css\' must be a file'
  //   );
  // });
  //
  // test('Transform target', async () => {
  //   await build({
  //     targets: [
  //       {
  //         src: 'src/assets/css/css-1.css',
  //         dest: ['dist', 'build'],
  //         transform: (contents) => contents.toString().replace('blue', 'red')
  //       },
  //       {
  //         src: 'src/assets/scss/**/*.scss',
  //         dest: 'dist',
  //         transform: (contents) =>
  //           contents.toString().replace('background-color', 'color')
  //       }
  //     ]
  //   });
  //
  //   expect(await fs.pathExists('dist/css-1.css')).toBe(true);
  //   expect(await readFile('dist/css-1.css')).toEqual(
  //     expect.stringContaining('red')
  //   );
  //   expect(await fs.pathExists('build/css-1.css')).toBe(true);
  //   expect(await readFile('build/css-1.css')).toEqual(
  //     expect.stringContaining('red')
  //   );
  //   expect(await fs.pathExists('dist/scss-1.scss')).toBe(true);
  //   expect(await readFile('dist/scss-1.scss')).toEqual(
  //     expect.not.stringContaining('background-color')
  //   );
  //   expect(await fs.pathExists('dist/scss-2.scss')).toBe(true);
  //   expect(await readFile('dist/scss-2.scss')).toEqual(
  //     expect.not.stringContaining('background-color')
  //   );
  //   expect(await fs.pathExists('dist/scss-3.scss')).toBe(true);
  //   expect(await readFile('dist/scss-3.scss')).toEqual(
  //     expect.not.stringContaining('background-color')
  //   );
  // });
});

// describe('Concat', () => {
//   test('Files', async () => {
//     await build({
//       targets: [
//         {
//           src: ['src/assets/asset-1.js', 'src/assets/asset-2.js'],
//           file: 'dist/asset-all.js'
//         }
//       ]
//     });
//
//     expect(await fs.pathExists('dist/asset-all.js')).toBe(true);
//     const contents = await readFile('dist/asset-all.js');
//     const contents1 = await readFile('src/assets/asset-1.js');
//     const contents2 = await readFile('src/assets/asset-2.js');
//     expect(
//       contents === ensureTrailingNewLine(contents1).concat(contents2)
//     ).toBe(true);
//   });
//
//   test('Glob', async () => {
//     await build({
//       targets: [{ src: 'src/assets/css/*', file: 'dist/css-all.css' }]
//     });
//
//     expect(await fs.pathExists('dist/css-all.css')).toBe(true);
//     const contents = await readFile('dist/css-all.css');
//     const contents1 = await readFile('src/assets/css/css-1.css');
//     const contents2 = await readFile('src/assets/css/css-2.css');
//     expect(
//       contents === ensureTrailingNewLine(contents1).concat(contents2)
//     ).toBe(true);
//   });
//
//   test('Throw if concat targets are not files', async () => {
//     await expect(
//       build({
//         targets: [{ src: 'src/assets/css', file: 'dist/css-all.css' }]
//       })
//     ).rejects.toThrow(
//       '"file" option works only on files: \'src/assets/css\' must be a file'
//     );
//   });
// });
//
// describe('Options', () => {
//   test('Verbose, copy files', async () => {
//     console.log = jest.fn();
//
//     await build({
//       targets: [
//         {
//           src: [
//             'src/assets/asset-1.js',
//             'src/assets/css/*',
//             'src/assets/scss',
//             'src/not-exist'
//           ],
//           dest: 'dist'
//         }
//       ],
//       verbose: true
//     });
//
//     expect(console.log).toHaveBeenCalledTimes(5);
//     expect(console.log).toHaveBeenCalledWith(green('copied:'));
//     expect(console.log).toHaveBeenCalledWith(
//       green(`  ${bold('src/assets/asset-1.js')} → ${bold('dist/asset-1.js')}`)
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       green(`  ${bold('src/assets/css/css-1.css')} → ${bold('dist/css-1.css')}`)
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       green(`  ${bold('src/assets/css/css-2.css')} → ${bold('dist/css-2.css')}`)
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       green(`  ${bold('src/assets/scss')} → ${bold('dist/scss')}`)
//     );
//   });
//
//   test('Verbose, merge files', async () => {
//     console.log = jest.fn();
//
//     await build({
//       targets: [
//         {
//           src: ['src/assets/*.js'],
//           file: 'dist/asset-all.js'
//         }
//       ],
//       verbose: true
//     });
//
//     expect(console.log).toHaveBeenCalledTimes(3);
//     expect(console.log).toHaveBeenCalledWith(green('copied:'));
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/asset-1.js')} → ${bold('dist/asset-all.js')}`
//       )} ${yellow('[M]')}`
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/asset-2.js')} → ${bold('dist/asset-all.js')}`
//       )} ${yellow('[M]')}`
//     );
//   });
//
//   test('Verbose, no files to copy', async () => {
//     console.log = jest.fn();
//
//     await build({
//       targets: [{ src: 'src/not-exist', dest: 'dist' }],
//       verbose: true
//     });
//
//     expect(console.log).toHaveBeenCalledTimes(1);
//     expect(console.log).toHaveBeenCalledWith(yellow('no items to copy'));
//   });
//
//   test('Verbose, rename files', async () => {
//     console.log = jest.fn();
//
//     await build({
//       targets: [
//         {
//           src: 'src/assets/asset-1.js',
//           dest: 'dist',
//           rename: 'asset-1-renamed.js'
//         },
//         {
//           src: 'src/assets/scss/*',
//           dest: 'dist/scss-multiple',
//           rename: (name, extension) =>
//             extension ? `${name}-renamed.${extension}` : `${name}-renamed`
//         }
//       ],
//       verbose: true
//     });
//
//     expect(console.log).toHaveBeenCalledTimes(5);
//     expect(console.log).toHaveBeenCalledWith(green('copied:'));
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/asset-1.js')} → ${bold(
//           'dist/asset-1-renamed.js'
//         )}`
//       )} ${yellow('[R]')}`
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/scss/scss-1.scss')} → ${bold(
//           'dist/scss-multiple/scss-1-renamed.scss'
//         )}`
//       )} ${yellow('[R]')}`
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/scss/scss-2.scss')} → ${bold(
//           'dist/scss-multiple/scss-2-renamed.scss'
//         )}`
//       )} ${yellow('[R]')}`
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/scss/nested')} → ${bold(
//           'dist/scss-multiple/nested-renamed'
//         )}`
//       )} ${yellow('[R]')}`
//     );
//   });
//
//   test('Verbose, transform files', async () => {
//     console.log = jest.fn();
//
//     await build({
//       targets: [
//         {
//           src: 'src/assets/css/css-*.css',
//           dest: 'dist',
//           transform: (contents) =>
//             contents.toString().replace('background-color', 'color')
//         }
//       ],
//       verbose: true
//     });
//
//     expect(console.log).toHaveBeenCalledTimes(3);
//     expect(console.log).toHaveBeenCalledWith(green('copied:'));
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/css/css-1.css')} → ${bold('dist/css-1.css')}`
//       )} ${yellow('[T]')}`
//     );
//     expect(console.log).toHaveBeenCalledWith(
//       `${green(
//         `  ${bold('src/assets/css/css-2.css')} → ${bold('dist/css-2.css')}`
//       )} ${yellow('[T]')}`
//     );
//   });
//   /* eslint-enable no-console */
//
//   test('Hook', async () => {
//     await build({
//       targets: [
//         {
//           src: ['src/assets/asset-1.js', 'src/assets/css'],
//           dest: 'dist'
//         }
//       ],
//       hook: 'buildStart'
//     });
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(true);
//     expect(await fs.pathExists('dist/css')).toBe(true);
//     expect(await fs.pathExists('dist/css/css-1.css')).toBe(true);
//     expect(await fs.pathExists('dist/css/css-2.css')).toBe(true);
//   });
//
//   test('Copy once', async () => {
//     const watcher = watch({
//       input: 'src/index.js',
//       output: {
//         dir: 'build',
//         format: 'esm'
//       },
//       plugins: [
//         copy({
//           targets: [{ src: 'src/assets/asset-1.js', dest: 'dist' }],
//           copyOnce: true
//         })
//       ]
//     });
//
//     await sleep(1000);
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(true);
//
//     await fs.remove('dist');
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(false);
//
//     await replace({
//       files: 'src/index.js',
//       from: 'hey',
//       to: 'ho'
//     });
//
//     await sleep(1000);
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(false);
//
//     watcher.close();
//
//     await replace({
//       files: 'src/index.js',
//       from: 'ho',
//       to: 'hey'
//     });
//   });
//
//   test('Flatten', async () => {
//     await build({
//       targets: [
//         {
//           src: ['src/assets/asset-1.js', 'src/assets/asset-2.js'],
//           dest: 'dist'
//         },
//         {
//           src: 'src/**/*.css',
//           dest: 'dist'
//         },
//         {
//           src: '**/*.scss',
//           dest: 'dist',
//           rename: (name, extension) => `${name}-renamed.${extension}`
//         }
//       ],
//       flatten: false
//     });
//
//     expect(await fs.pathExists('dist/assets/asset-1.js')).toBe(true);
//     expect(await fs.pathExists('dist/assets/asset-2.js')).toBe(true);
//     expect(await fs.pathExists('dist/assets/css/css-1.css')).toBe(true);
//     expect(await fs.pathExists('dist/assets/css/css-2.css')).toBe(true);
//     expect(await fs.pathExists('dist/assets/scss/scss-1-renamed.scss')).toBe(
//       true
//     );
//     expect(await fs.pathExists('dist/assets/scss/scss-2-renamed.scss')).toBe(
//       true
//     );
//     expect(
//       await fs.pathExists('dist/assets/scss/nested/scss-3-renamed.scss')
//     ).toBe(true);
//   });
//
//   test('Rest options', async () => {
//     await build({
//       targets: [{ src: 'src/assets/asset-1.js', dest: 'dist' }],
//       ignore: ['**/asset-1.js']
//     });
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(false);
//   });
//
//   test('Rest target options', async () => {
//     await build({
//       targets: [
//         {
//           src: 'src/assets/asset-1.js',
//           dest: 'dist',
//           ignore: ['**/asset-1.js']
//         }
//       ]
//     });
//
//     expect(await fs.pathExists('dist/asset-1.js')).toBe(false);
//   });
// });
