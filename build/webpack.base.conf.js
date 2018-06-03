const path = require("path");
const webpack = require("webpack");
const baseConfig = require("../config").base;
const utils = require("./utils.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AddAssertHtmlPlugin = require("add-asset-html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
// const Entries = utils.getEntries();
const resolve = dir => path.join(__dirname, "../", dir);
const assetsPath = dir => path.posix.join(baseConfig.assetsPath, dir);

module.exports = {
  // mode: isProd ? 'production' : 'development',
  entry: Object.assign(
    {
      app: path.resolve(__dirname, "../src/main.js")
    }
    // Entries
  ),
  // output: {
  //     path: baseConfig.path,
  //     publicPath: baseConfig.publicPath,
  //     filename:'[name].js' //'[name]-[chunkhash].js'
  // },
  //配置模块如何被解析
  resolve: {
    //自动解析文件扩展名(补全文件后缀)(从左->右)
    // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
    extensions: [".js", ".css", ".json", "scss", "jsx", "css"],

    //配置别名映射
    alias: {
      src: resolve("src")
      // CONFIG: path.resolve(__dirname, "../static/base.json")
    }
  },
  //处理模块的规则(可在此处使用不同的loader来处理模块！)
  module: {
    rules: [
      {
        test: /\.js|jsx$/, //资源路径
        loader: "babel-loader", //该路径执行的loader
        include: resolve("src"), //指定哪个文件loader
        exclude: path.resolve(__dirname, "../static/")
      },
      {
        test: /\.ts$/, //资源路径
        loader: "ts-loader", //该路径执行的loader
        include: resolve("src"), //指定哪个文件loader
        exclude: path.resolve(__dirname, "../static/")
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    // 抽离css
    new ExtractTextPlugin({
      filename: assetsPath("css/[name].css")
    }),
    // ...utils.getHtmlPlugins(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../src/index.html")
    })
    // new webpack.ProvidePlugin({
    //   // CONFIG: "CONFIG",
    //   // "windown.CONFIG": "CONFIG"
    // }),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require(path.join(__dirname, "..", "/dll", "manifest.json"))
    // }),
    // new AddAssertHtmlPlugin({
    //   filepath: path.join(__dirname, "../dll/vendors.dll.js"),
    //   includeSourcemap: false
    // })
  ]
};
