/* eslint-disable @typescript-eslint/no-require-imports, global-require */

// @ts-ignore - no included types
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import { gitDescribe, postcss, purgecss } from 'minna-tools';
import { preprocess } from 'minna-ui';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// @ts-ignore - no included types
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
// @ts-ignore - no included types
import config from 'sapper/config/rollup.js';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const rootDir = path.resolve(__dirname);
const release = gitDescribe();
const dependencies = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
];

const aliasOpts = {
  entries: [
    {
      find: /^##\/(.*)/,
      replacement: path.join(rootDir, 'src', '$1'),
    },
  ],
  resolve: ['.mjs', '.js', '.ts', '.svelte', '.json', '.md'],
};
const purgecssOpts = {
  content: [
    // XXX: Using `__sapper__/*` requires 2 builds
    '__sapper__/export/**/*.html',
    '__sapper__/export/**/*.js',
  ],
  // debug: true, // see purged names
};
const tsOpts = {
  exclude: /\.css$/,
  tsconfig: path.join(rootDir, 'tsconfig.build.json'),
  typescript: require('typescript'),
};

// @ts-ignore
const onwarn = (warning, _onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\](@sapper|mdast-util-to-hast|hast-util-to-html)[/\\]/.test(
      warning.message,
    )) ||
  _onwarn(warning);

// @ts-ignore
function dedupe(importee) {
  return dependencies.some(
    (dep) => importee === dep || importee.startsWith(`${dep}/`),
  );
}

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    onwarn,
    output: config.client.output(),
    plugins: [
      // @ts-ignore
      replace({
        'process.browser': true,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      alias(aliasOpts),
      json(),
      postcss(),
      svelte({
        dev,
        emitCss: true,
        hydratable: true,
        preprocess,
        preserveWhitespace: true, // Results in smaller code with closure compiler
      }),
      !dev && purgecss(purgecssOpts),
      resolve({
        browser: true,
        dedupe,
      }),
      commonjs(),
      typescript(tsOpts),
      !dev && terser({ module: true }),
    ],
  },

  server: {
    // input: config.server.input(),
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    onwarn,
    output: config.server.output(),
    plugins: [
      // @ts-ignore
      replace({
        'process.browser': false,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      alias(aliasOpts),
      json(),
      postcss(),
      svelte({
        dev,
        generate: 'ssr',
        hydratable: true,
        preprocess,
        preserveWhitespace: true,
      }),
      !dev && purgecss(purgecssOpts),
      resolve({ dedupe }),
      commonjs(),
      typescript(tsOpts),
    ],
    external: Object.keys(pkg.dependencies).concat(
      'rehype-shiki',
      require('module').builtinModules,
    ),
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    onwarn,
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      // @ts-ignore
      replace({
        'process.browser': true,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      typescript(tsOpts),
      !dev && terser(),
    ],
  },
};
