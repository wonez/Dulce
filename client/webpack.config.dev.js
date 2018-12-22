const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        // host: '0.0.0.0',
        // disableHostCheck: true,
        https: true,
        key: fs.readFileSync('/Users/wonez/SSLCert/server.key'),
        cert: fs.readFileSync('/Users/wonez/SSlCert/server.crt'),
        historyApiFallback: true,
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                            sourceMap: true
                        }
                    },
                    { 
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            data: '@import "variables";',
                            includePaths: [
                                path.resolve(__dirname, "./src")
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ttf|otf|eot|woff)$/,
                use: [
                  'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}