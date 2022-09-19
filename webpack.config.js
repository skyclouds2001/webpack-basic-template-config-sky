const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js',
    },
}