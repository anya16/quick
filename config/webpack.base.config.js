const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const hotMiddleware = require('webpack-hot-middleware');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const build = require('../build');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&noInfo=true';

module.exports = {
    entry: {
        bundle: [path.resolve(__dirname, '../src/app.js'), hotMiddlewareScript],
        vendor: ['jquery', 'underscore', 'director']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './static/' + '[name].[hash].js',
        publicPath: build.NODE_ENV === 'dev' ? '/' : ''
    },
    resolve: {},
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { compact: false }
        }, {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                loader: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'images/[name].[hash].[ext]'
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'runtime'] }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextWebpackPlugin({ filename: 'style.css' }),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};
