const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Zip = require("../scripts/jszip")

module.exports = {
    mode: "production",
    devtool: false,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                // 添加IE8支持
                ie8: true
            },
            sourceMap: false,
            // Enable parallelization. Default number of concurrent runs: os.cpus().length - 1 开启并行，默认值是cpu的数量-1
            parallel: true
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        // 删除重复的样式
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true, map: { inline: false } }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "京东联盟",
            template: resolve(__dirname, "../src/template/index.html"),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: "dependency"
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting 作用域提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        new Zip()
    ]
};
