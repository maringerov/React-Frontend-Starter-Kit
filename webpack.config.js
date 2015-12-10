var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var stylelint = require('stylelint');
var configSuitcss = require('stylelint-config-suitcss');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var cssnext = require('cssnext-loader');
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
  cssnext: {
    browsers: ['ff >= 20', 'ie >= 9', 'safari >= 5.1', 'opera >= 12', 'chrome >=20'],
    compress: true,
    messages: {console: true},
    map: false
  },
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
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!cssnext',
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
    return [stylelint(configSuitcss), autoprefixer, lost, postcssReporter];
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
