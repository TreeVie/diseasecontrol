const {resolve} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "#source-map",
    plugins: [
        
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            title:"京东联盟",
            template: resolve(__dirname,"../src/template/index.html"),
            inject: true
        })
    ]
};
