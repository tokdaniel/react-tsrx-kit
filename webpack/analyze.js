const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./prod');

const plugins = [new BundleAnalyzerPlugin()];

config.plugins = config.plugins.concat(plugins);
config.optimization.minimize = true;

module.exports = config;
