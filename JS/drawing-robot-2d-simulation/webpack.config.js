const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

module.exports =
  {
    entry: './src/main.ts',
    target: 'web',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin()]
  };
