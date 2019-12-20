const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
			]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)\/(?!nature-graphics-pattern-library)/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[chunkhash:4].style.css',
			chunkFilename: '[chunkhash:4].[id].css'
		})
	],
	mode: 'production'
})
