const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
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
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: { compact: false }
        }, {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'runtime'] }),
        new ExtractTextWebpackPlugin({ filename: 'style.css' }),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true
        })
    ]
};
