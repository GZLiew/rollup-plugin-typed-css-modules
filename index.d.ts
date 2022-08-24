import rollup from 'rollup';
import { run } from 'typed-css-modules';

/**
 * Creating css modules declaration files using Rollup
 */
export default function typedCssModules(
  options?: Parameters<typeof run>[1]
): rollup.Plugin;
