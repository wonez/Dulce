const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js',
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
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                  comments: false
                }
            }
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    }
}