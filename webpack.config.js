const path = require('path');

module.exports = {
    entry: './src/button.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'none'
}