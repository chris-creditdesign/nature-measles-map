const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPLugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, './'),
		port: 3000
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPLugin.loader,
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
		new MiniCssExtractPLugin({
			filename: '[chunkhash:4].style.css',
			chuckFilename: '[chunkhash:4].[id].css'
		})
	],
	mode: 'development'
})