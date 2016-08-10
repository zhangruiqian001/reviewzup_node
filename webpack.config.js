/**
 * Created by wei on 2016/8/2.
 */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:"./client/client.js"
    },
    output: {
        path: __dirname + '/public/js/',
        filename: "[name].bundle.js",
        chunkFilename: '[id].chunk.js' //chunk生成的配置
    },
    plugins: [
        /*,
         uglifyJsPlugin*/

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('develop')
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html', //生成的html存放路径，相对于path
            template: './client/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['app'], //需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },{
                test: /\.(eot|woff|woff2|ttf|svg|)$/,
                loader: "file-loader"
            }
        ]
    }
};