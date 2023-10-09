/**
 * Rollup 설정 모듈
 *
 * @author Seokhyun (Asher) Kim
 * @since 2023.10.08
 */

import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const external = ['react', 'react-dom'];

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals,
      },
      {
        file: pkg.module,
        format: 'es',
        globals,
      },
    ],
    external,
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve('./src') }],
      }),

      nodeResolve({ extensions }),

      babel({
        exclude: 'node_modules/**',
        extensions,
        include: ['src/**/*'],
      }),

      commonjs({ include: 'node_modules/**' }),

      peerDepsExternal(),

      typescript({ tsconfig: './tsconfig.json' }),

      postcss({
        extract: true,
        modules: true,
        sourceMap: false,
      }),

      image(),
    ],
  },
];

export default config;
