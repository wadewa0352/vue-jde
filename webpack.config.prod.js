import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
	mode: "production",
	devtool: "source-map",
	entry: {
		vendor: path.resolve(__dirname, "src/vendor"),
		main: path.resolve(__dirname, "src/index"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[chunkhash].js",
	},
	plugins: [
		// Generate an external css file with a hash in the filename
		new MiniCssExtractPlugin({
			filename: "[name].[chunkhash].css",
		}),

		// Create HTML file that includes regerence to bundled JS
		new HtmlWebpackPlugin({
			template: "src/index.html",
		}),
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
			{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
		],
	},
};
