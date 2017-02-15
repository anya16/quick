const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/app.js'),
        vendor: ['jquery', 'underscore']
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    resolve: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {compact: false}
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'runtime']}),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true
        })
    ]
};