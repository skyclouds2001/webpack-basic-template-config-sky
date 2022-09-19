const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/main.js',
    },
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8080,
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
    ],
};
