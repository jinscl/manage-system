const path 				= require('path');
const webpack 				= require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath:'/dist/',
		filename: 'js/app.js'
	},
	resolve:{
		alias : {
			page: path.resolve(__dirname, 'src/page'),
			component: path.resolve(__dirname, 'src/component')
		}		
	},	
	module: {
		rules: [
			//react(jsx)语法的处理
			{
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
				  		presets: ['env','react']
					}
				}
			},
			//css文件的处理
			{
				test: /\.css$/,
				use:  ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			//scss文件的处理
			{
				test: /\.scss$/,
				use:  ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","sass-loader"]
				})
			},
			//图片处理
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,//文件大于8k时，才会把它独立成一个文件
							name:'resource/[name].[ext]'
						}
					}
				]
			},
			//字体文件处理
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,//文件大于8k时，才会把它独立成一个文件
							name:'resource/[name].[ext]'
						}
					}
				]
			}
		]		
	},
	plugins:[
		//这将会在dist目录下产生一个index.html文件 
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		}),
		new ExtractTextPlugin("css/[name].css"),
		//提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'js/base.js'
		}),
	],
	devServer: {
    	port:8089,
    	historyApiFallback:{
    		index:'/dist/index.html'
    	}
    },
};