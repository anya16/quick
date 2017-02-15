var express = require('express');
var webpack = require('webpack');
var path = require('path');
var devConfig = require('./config/dev.config.js');
var baseConfig = require('./config/webpack.base.config.js');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var app = express();

var DEV_MODE = devConfig.dev;
var url = 'http://localhost:' + DEV_MODE.port;

var compiler = webpack(baseConfig);

var publicPath = path.join(__dirname);

app.use(devMiddleware(compiler, {
    publicPath: DEV_MODE.assetsPublicPath,
    noInfo: false,
    stats: {
        colors: true
    },
    quiet: false
}));

app.use(hotMiddleware(compiler, {
    log: ()=> {

    }
}));

app.use(express.static(publicPath));

app.listen(DEV_MODE.port, (err)=> {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('Listening at ' + url);
});