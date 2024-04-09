const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // Output directory for images
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/public/index.html',
            filename: 'index.html'
        }),
    ],
};
