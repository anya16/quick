const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: ['underscore', 'jquery']
    },
    output: {
        path: __dirname + '/dist/public',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'runtime']}),
        new HtmlwebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html',
            inject: true,
            hash: true
        }),
        new AssetsPlugin({
            filename: 'dist/webpack.assets.js',
            processOutput: function (assets) {
                return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
            }
        })
    ],
    devServer: {
        contentBase: './dist',
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};