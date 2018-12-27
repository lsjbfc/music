const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = require("../config");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
// path.resolve(__dirname, "../src/lib/vendors.js")
module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "../"),
  entry: {
    vendors_1: [
      "babel-polyfill",
      "vue/dist/vue.esm.js",
      "vuex",
      "vue-router",
      "axios",
      "fastclick",
      "clipboard",
      "better-scroll"
    ]
  },
  output: {
    path: path.join(__dirname, "../dll"), // 动态链接库输出的文件名称
    filename: "static/js/[name].dll.[hash:8].js", // 动态链接库输出路径
    libraryTarget: "var", // 链接库输出方式 默认'var'形式赋给变量
    library: "_dll_[name]_[hash:8]" // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendors"
        },
        "async-vendors": {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: "async",
          name: "async-vendors"
        }
      }
    }
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dll", "[name].manifest.json"),
      name: "_dll_[name]_[hash:8]",
      context: process.cwd()
    }),
    new AssetsPlugin({
      filename: "vendor.config.json",
      path: path.resolve(__dirname, "../dll")
    })
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false,
    //       drop_debugger: true,
    //       drop_console: true
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // })
  ]
};
