const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./base');

const plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|html)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new MiniCssExtractPlugin({
    filename: 'main-[hash].css',
    chunkFilename: 'vendor-[contenthash].css'
  }),
];

config.plugins = config.plugins.concat(plugins);
config.optimization.minimize = true;

module.exports = config;
