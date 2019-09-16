import fs from 'fs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-commonjs';

const entries = {};

fs.readdirSync('./src').forEach((x) => {
  const key = x.split('.').shift();
  entries[key] = `./src/${key}`;
});

export default {
  input: './src/index.js',
  external: ['react', 'react-dom', 'prop-types', 'hoist-non-react-statics',],
  output: [
    {
      format: 'esm',
      dir: 'es',
      exports: 'named'
    },
    {
      format: 'cjs',
      dir: 'lib',
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
  ]
};
