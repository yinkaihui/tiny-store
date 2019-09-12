const path = require('path');
const webpack = require('webpack');
const fs = require('fs')

const files = fs.readdirSync('src')
const entries = {}
files.map(x => {
  entries[x] = `./src/${x}`
})

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /.js?$/, // 文件过滤规则
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react']
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ]
          }
        }
      }
    ]
  },
};