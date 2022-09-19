const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/main.js',
    },
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8080,
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './src/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};
