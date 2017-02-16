/**
 * 基础模块
 */
var express = require('express');
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
var baseConfig = require('./config/webpack.base.config');
var buildConfig = require('./config/webpack.build.config');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var publicPath = path.join(__dirname);
var autoOpenBrowser = !!DEV_MODE.autoOpenBrowser;
var app = express();

/**
 * 当前模式选择
 * @type {any}
 */
if (_ENV === 'dev') {
    var url = 'http://localhost:' + DEV_MODE.port;

    var compiler = webpack(baseConfig);

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
        if (autoOpenBrowser) {
            open(url);
        }
        console.log('Listening at ' + url);
    });
}

if (_ENV === 'build') {
    shell.rm('-rf', publicPath + '/dist');
    webpack(buildConfig, (err, stats)=> {
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
    /**
     * do...
     */
}