var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');


var config = {

  entry: {
	index: './src/pages/route.js'
  },

  output: {
	path: __dirname + '/assets',
	filename: 'js/[name].js',
	chunkFilename: 'js/[name].[chunkhash:8].js',
	publicPath: '/react-redux-chat/'
  },
  
  plugins: [
	// new ExtractTextPlugin('[name].css', {
	//   allChunks: true
	// }),
	new webpack.optimize.CommonsChunkPlugin({
	  name: 'vendors'
	}),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
  ],

  resolve: {
	extensions: ['', '.js', '.jsx', '.scss'],
	alias: {
	  src : __dirname + '/src',
	}
  },

  module: {
	loaders: [
	  { 
		test: /\.scss$/,
		loader: 'style-loader!css?-minimize!autoprefixer?{browsers:["last 2 version", "> 1%", "iOS 7"]}!sass?sourceMap'
	  },
	  // { test: /\.scss$/i, loader: ExtractTextPlugin.extract('style','css?sourceMap&modules&importLoaders=1&localI‌​dentName=[name]__[local]___[hash:base64:5]!sass?sourceMap') },
	  {
		test: /\.(woff|woff2|ttf|eot|svg)$/,
		loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
	  },
	  {
		test: /\.(png|jpg|jpeg|gif)$/,
		loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
	  }
	]
  },
	
};

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'eval-source-map';
	config.module.loaders.push({
	  test: /\.(js|jsx)$/,
	  exclude: /node_modules/,
	  loader: 'babel',
	  query: {
		presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
		plugins: ['add-module-exports',"transform-runtime"]
	  }
	});
	// webpack-dev-server配置
	config.devServer= {
		port:8085,
		// host:"dev.honeybadger8.com",
		historyApiFallback: true,
		noInfo: false,
		publicPath: config.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	};
	config.plugins.push(new webpack.DefinePlugin({
	  "process.env": {
	    NODE_ENV: JSON.stringify("development")
	  },
	  __DEBUG__: true
	}));
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}else{
  	config.module.loaders.push({
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
		presets: ['react', 'es2015', 'stage-0'],
		plugins: ['add-module-exports',"transform-runtime"]
		}
	});
	config.plugins.push(new webpack.DefinePlugin({
	  "process.env": {
	    NODE_ENV: JSON.stringify("production")
	  },
	  __DEBUG__: false
	}));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
	  compress: {
		warnings: false
	  },
	  output: {
		comments: false,
	  }
  }));
  config.plugins.push(new HtmlWebPackPlugin({
	  filename: path.resolve(__dirname, 'assets/index.html'),
	  template: "index.html",
	  inject: false
  }));
}
module.exports = config;