var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var stylelint = require('stylelint');
var cssnext = require('postcss-cssnext');
var configSuitcss = require('stylelint-config-suitcss');
var lost = require('lost');
var postcssReporter = require('postcss-reporter');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    PATHS.app
  ],
  resolve: ['', '.js', '.jsx'],
  module: {
    preLoaders: [
      {
        test: /\.css$/,
        loader: 'postcss',
        include: PATHS.app
      },
      {
        test: /\.js?$/,
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
        exclude: /(node_modules)/,
        loader: 'react-hot!babel',
        include: PATHS.app
      }
    ]
  },
  postcss: function () {
    return [stylelint(configSuitcss), lost, postcssReporter, cssnext];
  },
  plugins: [
    new HtmlwebpackPlugin({
      // Replace with the title of your project
      title: 'React Frontend Starter Kit'
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
      // To mute the output in the console, uncomment the 'quiet' property below
      // quiet: true,
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
