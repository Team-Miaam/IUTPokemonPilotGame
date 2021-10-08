module.exports = {
	mode: 'development',
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	entry: {
		index: './index.js',
	},
	watchOptions: {
		ignored: '/node_modules/',
	},
	devtool: 'source-map',
};
