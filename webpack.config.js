const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: 'assets/[name].[hash].[ext]',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_module/,
				use: ['babel-loader'],
			},
			{
				test: /\.svg/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new Dotenv(),
	],
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	devtool: 'inline-cheap-source-map',
	context: __dirname,
	target: 'web',
	devServer: {
		static: path.join(__dirname, 'dist'),
		port: 3000,
		compress: true,
		hot: true,
	},
}