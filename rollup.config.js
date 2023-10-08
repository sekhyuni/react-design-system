/**
 * Rollup 설정 모듈
 *
 * @author Seokhyun (Asher) Kim
 * @since 2023.10.08
 */

const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

const pkg = require('./package.json');

const config = [
  {
    external: [/node_modules/],
    input: './src/index.ts',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        file: pkg.module,
        format: 'es',
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: 'umd',
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        include: ['src/**/*'],
      }),
      commonjs({ include: 'node_modules/**' }),
      peerDepsExternal(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
];

module.exports = config;
