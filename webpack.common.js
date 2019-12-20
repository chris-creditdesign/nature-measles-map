const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

var gitRevisionPlugin = new GitRevisionPlugin({
	commithashCommand: 'rev-parse --short HEAD'
})
const COMMITHASH = gitRevisionPlugin.commithash()

// The clean options to use
const cleanOptions = {
	exclude: [
		'img',
		'video',
		'audio',
		'pdf'
	],
	verbose: true
}

module.exports =  {
	entry: ["@babel/polyfill", "./src/js"],
	output: {
		filename: '[name]-[chunkhash:5]-bundle.js',
		path: path.resolve(__dirname, './public'),
		publicPath: './public/',
	},
	module: {
		rules: [
			{
				test: /\.(csv|tsv)$/,
				use: ['csv-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['public'], cleanOptions),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			commithash: COMMITHASH,
			template: './src/html/index.html'
		})
	]
}
