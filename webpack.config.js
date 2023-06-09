const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	mode: 'none',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: 'assets/[name].[hash].[ext]',
		publicPath: '/',
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
		new Dotenv({
			systemvars: true,
		}),
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
		historyApiFallback: true,
		port: 3000,
		compress: true,
		hot: true,
	},
}
