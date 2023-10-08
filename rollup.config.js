/**
 * Rollup 설정 모듈
 *
 * @author Seokhyun (Asher) Kim
 * @since 2023.10.08
 */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

import pkg from './package.json' assert { type: 'json' };

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
        globals: {
          react: 'React',
          'style-inject': 'styleInject',
        },
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
      postcss({
        extract: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`,
        modules: true,
        sourceMap: false,
      }),
      image(),
      alias({
        entries: [{ find: '@/assets', replacement: 'src/assets' }],
      }),
    ],
  },
];

export default config;
