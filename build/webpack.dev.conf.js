"use strict";
const path = require("path");
const webpack = require("webpack");
const styleLoader = require("./style-loader");
const devConf = require("../config").dev; //开发环境配置参数
const baseConf = require("./webpack.base.conf"); //webpack基本配置

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge");
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin");
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
//发送系统通知的一个node模块！
const notifier = require("node-notifier");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const dev = merge(baseConf, {
  mode: "development",
  module: {
    rules: styleLoader.styleLoaders({
      extract: true,
      sourceMap: true,
      usePostCSS: true
    })
  },

  //生成sourceMaps(方便调试)
  devtool: devConf.devtoolType,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(devConf.assetsPublicPath, "index.html")
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: "localhost",
    port: 9001,
    open: true,
    overlay: true
      ? {
          warnings: false,
          errors: true
        }
      : false,
    publicPath: "/",
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  //   optimization: {
  //     runtimeChunk: {
  //       name: "manifest"
  //     },
  //     splitChunks: {
  //       cacheGroups: {
  //         commons: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: "vendor",
  //           chunks: "all"
  //         }
  //       }
  //     }
  //   },
  /*
          optimization: {
              splitChunks: {
                chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
                minSize: 0,                // 最小尺寸，默认0
                minChunks: 1,              // 最小 chunk ，默认1
                maxAsyncRequests: 1,       // 最大异步请求数， 默认1
                maxInitialRequests: 1,    // 最大初始化请求书，默认1
                name: () => {},              // 名称，此选项课接收 function
                cacheGroups: {                 // 这里开始设置缓存的 chunks
                  priority: "0",                // 缓存组优先级 false | object |
                  vendor: {                   // key 为entry中定义的 入口名称
                    chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
                    name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
                    minSize: 0,
                    minChunks: 1,
                    enforce: true,
                    maxAsyncRequests: 1,       // 最大异步请求数， 默认1
                    maxInitialRequests: 1,    // 最大初始化请求书，默认1
                    reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
                  }
                }
              }
            },
           */
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[chunkhash:8].css",
    //   chunkFilename: "[id].css"
    // }),
    //显示模块相对路径
    new webpack.NamedModulesPlugin(),

    //配置html入口信息
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: path.resolve(__dirname, '../code/client/index.html'),
    //     inject: true
    // }),

    //编译提示插件
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http:`]
      },
      onErrors: function(severity, errors) {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        const filename = error.file.split("!").pop();
        // console.log(filename)
        //编译出错时,右下角弹出错误提示！
        notifier.notify({
          title: "blog",
          message: severity + ": " + error.name,
          subtitle: filename || ""
        });
      }
    })
  ]
});
console.log(JSON.stringify(dev));
module.exports = dev;
