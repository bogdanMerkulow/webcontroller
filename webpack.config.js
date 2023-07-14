const path = require("path");
module.exports = {
    entry: './app/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, 'app')],
                use: 'ts-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: 'app',
        filename: 'index.js',
        path: path.resolve(__dirname, 'app'),
    }
};