var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './build/main.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'destiny.js',
        libraryTarget: 'var',
        library: 'Destiny'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     mangle: {
        //         except: ['exports', 'require']
        //     }
        // })
    ]
};
