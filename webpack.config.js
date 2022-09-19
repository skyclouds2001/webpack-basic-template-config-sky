const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    devTools: 'eval-source-map',
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
        new HtmlPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
    ],
};
