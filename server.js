/**
 * 基础模块
 */
var express = require('express');
var http = require('http');
var webpack = require('webpack');
var open = require('opn');
var path = require('path');
var shell = require('shelljs');
var _ENV = process.env.NODE_ENV = require('./build').NODE_ENV;

/**
 * dev:开发环境  build:编译环境
 * @type {any}
 */
var DEV_MODE = require('./config/config.js')[_ENV];

/**
 * webpack基本配置
 */
var buildConfig = require('./config/webpack.build.config');
var devConfig = require('./config/webpack.dev.config');
var publicPath = path.join(__dirname);
var autoOpenBrowser = !!DEV_MODE.autoOpenBrowser;
var app = express();

/**
 * 当前模式选择
 * dev:调试 build:编译
 * @type {any}
 */

if (_ENV === 'dev') {
    var url = 'http://localhost:' + DEV_MODE.port;

    var compiler = webpack(devConfig);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: DEV_MODE.assetsPublicPath,
        noInfo: false,
        stats: {
            colors: true
        },
        quiet: true
    });

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    });

    //require('eventsource-polyfill');

    app.use(devMiddleware);

    app.use(hotMiddleware);

    app.use(express.static(publicPath));

    var server = http.createServer(app);

    server.listen(DEV_MODE.port, (err) => {
        if (err) {
            console.log(err);
            return false;
        }
        if (autoOpenBrowser) {
            open(url);
        }
        console.log('Listening at ' + url);
    });
} else if (_ENV === 'build') {
    shell.rm('-rf', path.join(publicPath, 'dist'));
    webpack(buildConfig, (err, stats) => {
        if (err) {
            throw err;
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        let msg = 'Tip: built files are meant to be served over an HTTP server.\n' +
            'Opening index.html over file:// won\'t work.\n';
        console.log(msg);
    });
}
