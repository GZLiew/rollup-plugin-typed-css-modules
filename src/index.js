import fs from 'fs';
import util from 'util';
import glob from 'glob';
import { run as typedCssModuleRun } from 'typed-css-modules';

const globPromisify = util.promisify(glob);
const fsunlinkPromisify = util.promisify(fs.unlink);

const typedCssModules = (options = {}) => {
  const {
    searchDir = 'src',
    outDir = 'dist',
    pattern = '**/*.module.css',
    namedExports,
    camelCase,
    dropExtension,
    listDifferent,
    silent = true
  } = options;

  const resolveOptions = {
    searchDir,
    outDir,
    pattern,
    namedExports,
    camelCase,
    dropExtension,
    listDifferent,
    silent
  };

  return {
    name: 'rollup-plugin-typed-css-modules',
    buildStart: async () => {
      try {
        await Promise.all([
          typedCssModuleRun(searchDir, {
            ...resolveOptions,
            outDir: 'src'
          }),
          typedCssModuleRun(searchDir, resolveOptions)
        ]);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    writeBundle: async () => {
      try {
        const files = await globPromisify(`${searchDir}/${pattern}`);
        await Promise.all(
          files.map(async (cssFilePath) => {
            const srcPath = `${cssFilePath}.d.ts`;
            try {
              await fsunlinkPromisify(srcPath);
            } catch (error) {
              if (!silent) {
                console.log(srcPath, 'file does not exist');
                console.log(error);
              }
            }
          })
        );
      } catch (error) {
        throw error;
      }
    }
  };
};

export default typedCssModules;
