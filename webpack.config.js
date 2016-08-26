'use strict';

const path = require('path');
const webpack = require('webpack');
// const WebpackBrowserPlugin = require('webpack-browser-plugin');
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
    path: path.join(__dirname, "wwwroot", 'js'),
    filename: 'bundle.js'
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
      { test: /\.css$/, loader: ExtractTextPlugin.extract(/* before= */'style', /* loader= */'css!postcss') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(/* before= */'style', /* loader= */'css?sourceMap!postcss!sass?sourceMap') },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=../fonts/[name].[ext]'
      }
    ]
  },
  postcss: function () {
    return [require('postcss-clean'), require('autoprefixer')];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      _: "lodash"
    }),
    // new WebpackBrowserPlugin(),
    new ExtractTextPlugin(/* filename= */'../css/bundle.css')
  ]
}
