const mainConfig = require('./webpack.conf.js');
const merge = require('webpack-merge');
const devConfig = {
  "devServer": {
    "historyApiFallback": true,
    proxy: {
      "/Api": {
        "target": 'http://app.basicflux.com',
        "pathRewrite": {
          '^/Api': 'api'
        },
        "changeOrigin": true,
        "secure": false
      },
    }
  }

}

module.exports = merge(devConfig, mainConfig);
