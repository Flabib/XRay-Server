const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const client_port = process.env.CLIENT_PORT || 1928;

module.exports = {
    mode: 'development',
    entry: './client/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'client/dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/main.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ],
    devServer: {
        host: 'localhost',
        port: client_port,
        historyApiFallback: true,
        open: false,
        hot: true
    }
};