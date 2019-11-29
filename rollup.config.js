import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import config from 'sapper/config/rollup.js';
import { preprocess } from 'minna-ui';
import { gitDescribe, postcss, purgecss } from 'minna-tools';
import { join } from 'path';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const release = gitDescribe();

const purgecssOpts = {
  content: [
    // XXX: Using `__sapper__/*` requires 2 builds
    '__sapper__/export/**/*.html',
    '__sapper__/export/**/*.js',
  ],
  // debug: true, // see purged names
};

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = (importee) =>
  importee === 'svelte' || importee.startsWith('svelte/');

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
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
      typescript({
        exclude: /\.css$/,
        tsconfig: join(__dirname, 'tsconfig.build.json'),
        typescript: require('typescript'),
      }),
      !dev &&
        terser({
          module: true,
        }),
      // !dev &&
      //   terser({
      //     compress: {
      //       booleans: true,
      //       collapse_vars: true,
      //       comparisons: true,
      //       conditionals: true,
      //       dead_code: true,
      //       drop_console: false,
      //       drop_debugger: true,
      //       evaluate: true,
      //       // hoist_funs: true, // broken; shouldn't hoist above imports
      //       if_return: true,
      //       join_vars: true,
      //       keep_fargs: false,
      //       loops: true,
      //       negate_iife: false,
      //       passes: 4,
      //       properties: true,
      //       pure_funcs: ['Object.freeze'],
      //       pure_getters: true,
      //       sequences: true,
      //       side_effects: true,
      //       unused: true,
      //     },
      //     ecma: legacy ? 5 : 8,
      //     mangle: true,
      //     module: true,
      //     output: {
      //       comments: /[@#]__PURE__/,
      //       wrap_iife: true,
      //     },
      //     sourcemap: true,
      //     warnings: true,
      //   }),
    ],
    onwarn,
  },

  server: {
    // input: config.server.input(),
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      postcss(),
      svelte({
        dev,
        generate: 'ssr',
        preprocess,
        preserveWhitespace: true,
      }),
      !dev && purgecss(purgecssOpts),
      resolve({ dedupe }),
      commonjs(),
      typescript({
        exclude: /\.css$/,
        tsconfig: join(__dirname, 'tsconfig.build.json'),
        typescript: require('typescript'),
      }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives')),
    ),
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.APP_VERSION': JSON.stringify(release),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      typescript({
        exclude: /\.css$/,
        tsconfig: join(__dirname, 'tsconfig.build.json'),
        typescript: require('typescript'),
      }),
      !dev && terser(),
    ],
    onwarn,
  },
};
