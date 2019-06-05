const path = require('path');
const config = require('./base');

const plugins = [];

config.plugins = config.plugins.concat(plugins);

config.devServer = {
  port: 8080,
  historyApiFallback: true
};

config.devtool = 'inline-source-map';

module.exports = config;
