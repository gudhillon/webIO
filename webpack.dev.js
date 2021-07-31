const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Webpack Config, leads to efficiency in development

module.exports = merge(common, {
  mode: 'development',
});
