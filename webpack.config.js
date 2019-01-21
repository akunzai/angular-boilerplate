'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'wwwroot'),
    publicPath: '/assets/',
    open: true
  },
  entry: { main: './src/app/main.ts' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot','assets')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [{ loader: 'tslint-loader' }]
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ng-annotate-loader' }, { loader: 'ts-loader' }]
      },
      { test: /\.html$/, use: [{ loader: 'html-loader' }] },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(eot|otf|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
};
