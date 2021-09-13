const path = require('path');
// const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  context: __dirname,
  entry: './server/client/src/index.js',
  output: {
    path: path.resolve('./server/client/static/client/bundles'),
    filename: "[name]-[hash].js"
  },

  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({filename: './server/webpack-stats.json'})
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}