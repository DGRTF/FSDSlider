const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let rootDirectory = '';

module.exports = (env, options) => {
    if (options.mode === 'production')
        rootDirectory = '/FSDSlider';

    return {
        entry: { index: './src/pages/demo/demo.js' },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output:
        {
            path: path.resolve(__dirname, 'dist'),
            filename: 'scripts/[name].js',
        },
        plugins:
            [
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: './src/pages/demo/demo.pug',
                }),

                new MiniCssExtractPlugin({
                    filename: "css/[name].css",
                }),

                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    "window.jQuery": "jquery",
                }),
            ],
        module:
        {
            rules:
                [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /tests/,
                    },

                    {
                        test: /\.pug$/,
                        loader: 'pug-loader',
                        options:
                        {
                            pretty: true
                        }
                    },

                    {
                        test: /\.scss$/,
                        use: [
                            // Creates `style` nodes from JS strings
                            { loader: 'style-loader' },
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            // Translates CSS into CommonJS
                            { loader: 'css-loader' },
                            { loader: 'postcss-loader' },
                            { loader: 'resolve-url-loader' },
                            {
                                // Compiles Sass to CSS
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },

                ],
        },
    }
}