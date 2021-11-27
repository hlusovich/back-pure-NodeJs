const path = require("path");
const webpack = require("webpack");

module.exports = {
    target: "node",
    mode: "production",
    entry: './runApp.js',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};
