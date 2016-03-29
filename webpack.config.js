var path = require('path');
var node_dir = __dirname + '/node_modules';

module.exports = {
    entry: {
        entries: './src/knowledgeModule.js',
        vendors: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'react': node_dir + '/react/dist/react-with-addons.min.js',
        }
    },

    loaders: [{test: /\.js?$/, loaders: ['jsx?harmony']}],

    module: {
        noParse: ['react']
    }
};