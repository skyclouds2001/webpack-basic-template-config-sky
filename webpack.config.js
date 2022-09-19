const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js',
    },
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8080,
    },
};
