var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var stylelint = require('stylelint');
var autoprefixer = require('autoprefixer');
var lost = require('lost');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,
  resolve: ['', '.js', '.jsx'],
  module: {
    preLoaders: [
      {
        test: /\.css$/,
        loader: 'postcss',
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint!jscs',
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: PATHS.app
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: PATHS.app
      }
    ]
  },
  postcss: function () {
    return [stylelint({
      rules: {
        'color-hex-case': 2
      }
    }), autoprefixer, lost];
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'studio by sekwoia'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      quiet: true,
      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
