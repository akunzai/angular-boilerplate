'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: { main: ['./src/app/main.ts', './src/app/main.scss'] },
  output: {
    publicPath: './',
  },
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ng-annotate-loader', 'ts-loader'],
      },
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|otf|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        // https://webpack.js.org/guides/asset-modules/
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupfilename
      filename: 'vendors.js',
    },
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/app/locales', to: 'locales/' }],
    }),
    new ESLintPlugin({ extensions: '.ts' }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
