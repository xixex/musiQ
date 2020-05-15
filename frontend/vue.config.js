/* eslint-disable global-require */
const path = require('path');

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 4200,
    disableHostCheck: true,
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', require('path').resolve(__dirname, 'src'));
    config.resolve.alias
      .set('components', require('path').resolve(__dirname, 'components'));
    config.resolve.alias
      .set('assets', require('path').resolve(__dirname, 'src/assets'));
  },
};
