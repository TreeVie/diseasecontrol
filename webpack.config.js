const fs = require("fs");
const { resolve } = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 生产环境
const prod = require("./config/webpack.prod");
// 预发环境
const dev = require("./config/webpack.dev");

// 样式主题定制
const themeVariables = require("less-vars-to-js")(
    fs.readFileSync(resolve(__dirname, "./src/assets/style/theme.less"), "utf8")
);

module.exports = function(env, argv) {
    // console.log(require("chalk").green.bold(JSON.stringify(argv.aaa)));
    let isProduction = env === "production";
    let base = {
        entry: resolve(__dirname, "./src/index.js"),
        output: {
            filename: "js/[name].[hash:5].js",
            path: resolve(__dirname, "dist"),
            publicPath: "/"
        },
        resolve: {
            extensions: [".js", ".vue", ".less"],
            alias: {
                vue: "vue/dist/vue.js"
            },
            // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
            mainFields: ["jsnext:main", "browser", "main"]
        },
        devServer: {
            hot: true,
            host: "12379.com",
            port: "8021",
            // jd域名均允许
            allowedHosts: [".12379.com"]
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        transformToRequire: {
                            video: ["src", "poster"],
                            source: "src",
                            img: "src",
                            image: "xlink:href"
                        }
                    }
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    include: [
                        resolve("src"),
                        resolve("test"),
                        resolve("node_modules/webpack-dev-server/client")
                    ]
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        "vue-style-loader",
                        ...(isProduction
                            ? [MiniCssExtractPlugin.loader, "css-loader"]
                            : ["css-loader"]),
                        {
                            loader: "less-loader",
                            options: {
                                modifyVars: themeVariables
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: "img/[name].[hash:5].[ext]"
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "media/[name].[hash:5].[ext]"
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "fonts/[name].[hash:5].[ext]"
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                prefixCls: JSON.stringify(themeVariables["@css-prefix"])
            }),
            argv["a"] || argv["analysis"]
                ? new (require("webpack-bundle-analyzer")).BundleAnalyzerPlugin()
                : () => {},
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "css/[name].[hash:5].css",
                chunkFilename: "css/[name].[hash:5].css"
            })
        ]
    };
    return merge(base, isProduction ? prod : dev);
};
