const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
	// Currently we need to add '.ts' to the resolve.extensions array.
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	// Source maps support ('inline-source-map' also works)
	devtool: 'source-map',
	//devtool: 'cheap-module-eval-source-map',
	// Add the loader for .ts files.
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	plugins: [new CheckerPlugin()]
};
