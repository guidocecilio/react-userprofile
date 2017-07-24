/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = (
  process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development'
);

const DEBUG = ENV !== 'production';
const metadata = {
  port: process.env.WEBPACK_PORT || 8080,
  host: process.env.WEBPACK_HOST || 'localhost',
  ENV: ENV,
  HMR: process.argv.join('').indexOf('hot') >= 0 || !!process.env.WEBPACK_HMR
};
const outDir = path.resolve(__dirname, 'dist');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true
});

const extractCSS = new ExtractTextPlugin('[name].css');
const extractLESS = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: {
    app: ['./src/app.jsx']
  },
  output: {
    path: outDir,
    filename: DEBUG ? '[name].bundle.js' : '[name].[chunkhash].bundle.js',
    sourceMapFilename: (
      DEBUG ? '[file].map' : '[file].[chunkhash].bundle.map'
    ),
    chunkFilename: DEBUG ? '[id].chunk.js' : '[id].[chunkhash].chunk.js'
  },
  // devtool: DEBUG ? 'source-map' : '',
  devtool: 'cheap-module-inline-source-map',
  resolve: {
    modules: [path.resolve(), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        // enforce: "pre",
        //loader: 'eslint-loader',
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
        // include: [
        //   path.resolve(__dirname, 'src')
        // ]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/, // or include: path.resolve('src'),
      //   loader: 'babel-loader',
      //   query: {
      //     presets: [
      //       ['es2015', {
      //         loose: true, // this helps simplify javascript transformation
      //         module: false // this helps enable tree shaking for webpack 2
      //       }],
      //       'stage-1'
      //     ],
      //     plugins: ['transform-decorators-legacy']
      //   }
      // },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        use: [
          'raw-loader',
          'html-minifier-loader'
        ]
      },
      // // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      // {
      //   test: /\.css$/i,
      //   issuer: [{ not: [{ test: /\.html$/i }] }],
      //   use: ['style-loader']
      // },
      // Extract css files
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     use: 'style-loader!css-loader!postcss-loader'}
      //   )
      // }
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract(['css-loader', 'less-loader'])
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          // fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: ENV === 'development'
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: ENV === 'development'
            }
          }]
        })
      }
    ]
  },
  plugins: [
    extractCSS,
    extractLESS,
    extractSass,
    new webpack.LoaderOptionsPlugin({
      debug: DEBUG,
      devtool: 'source-map',
      options: {
        context: __dirname,
        'html-minifier-loader': {
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime',
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    // https://www.npmjs.com/package/dotenv-webpack
    new Dotenv({
      path: process.env.DEPLOY_ENV || './.env',
      safe: true
    }),
  ].concat(DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8: true, keep_fnames: true },
      dead_code: true,
      unused: true,
      comments: false,
      compress: {
        screw_ie8: true,
        keep_fnames: true,
        drop_debugger: false,
        dead_code: false,
        unused: false,
        warnings: false
      }
    })
  ]),
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
