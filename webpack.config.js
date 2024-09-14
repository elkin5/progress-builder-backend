const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/app.js', // Archivo de entrada principal
    target: 'node',
    externals: [nodeExternals()], // Excluye las dependencias de node_modules
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    mode: 'production'
};