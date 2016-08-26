'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "wwwroot")
  },
  entry: {
    app: './src/app/main.ts',
    vendor: [
      'angular',
      'angular-animate',
      'angular-cookies',
      'angular-messages',
      'angular-sanitize',
      'angular-translate',
      'angular-translate-loader-static-files',
      'angular-ui-bootstrap',
      'angular-ui-router',
      'bootstrap-sass',
      'jquery',
      'lodash'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, "wwwroot", 'assets'),
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ng-annotate!ts' },
      // https://github.com/webpack/webpack/issues/1078
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          /* before= */'style',
          /* loader= */'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          /* before= */'style',
          /* loader= */'css?sourceMap!sass?sourceMap')
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      _: "lodash"
    }),
    new ExtractTextPlugin(/* filename= */'bundle.css')
  ]
};
