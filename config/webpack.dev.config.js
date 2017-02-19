var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config');
var webpackDevConfig = merge(webpackBaseConfig, {});
module.exports = webpackDevConfig;