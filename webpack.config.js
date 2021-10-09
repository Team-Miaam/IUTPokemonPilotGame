const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	target: 'web',
	module: {
		// rules: [
		// 	{
		// 		test: /\.js$/,
		// 		enforce: 'pre',
		// 		use: ['source-map-loader'],
		// 	},
		// ],
	},
	entry: {
		index: './index.js',
	},
	watchOptions: {
		ignored: '/node_modules/',
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},

	// devtool: 'source-map',
};
