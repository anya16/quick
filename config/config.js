const path = require('path');
module.exports = {
    dev: {
        port: 8000,
        autoOpenBrowser: true,
        assetsSubDirectory: path.resolve('/public'),
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    },
    build: {
        assetsSubDirectory: path.resolve('/static'),
        assetsPublicPath: '/'
    }
};