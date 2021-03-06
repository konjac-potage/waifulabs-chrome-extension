const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    content: './src/content_scripts/index.js',
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [new CopyPlugin([{ from: 'src/static/', to: '.' }])],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
};
