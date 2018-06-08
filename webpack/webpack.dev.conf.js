const mainConfig = require('./webpack.conf.js');
const merge = require('webpack-merge');
const devConfig = {
  "devServer": {
    "historyApiFallback": true,
    proxy: {
      "/Api": {
        "target": 'http://localhost:59912',
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
