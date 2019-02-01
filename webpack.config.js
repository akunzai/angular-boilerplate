'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  return {
    mode: 'development',
    entry: { main: './src/app/main.ts' },
    output: {
      filename: devMode ? '[name].js' : '[name].[hash].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          use: ['tslint-loader']
        },
        {
          test: /\.tsx?$/,
          use: ['ng-annotate-loader', 'ts-loader']
        },
        { test: /\.html$/, use: ['html-loader'] },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(eot|otf|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader']
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    performance: {hints: false},
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        _: 'lodash'
      }),
      new CopyWebpackPlugin([
        { from: './src/app/locales', to: 'locales/' }
      ]),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ]
  };
};
