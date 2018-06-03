const path = require("path");
const os = require("os");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vendorDllManifest = require("../dll/vendors.manifest.json");
const vendorDllConfig = require("../dll/vendor.config.json");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const styleLoader = require("./style-loader");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConf = require("./webpack.base.conf"); //webpack基本配置
const prodConf = require("../config").build; //生产环境配置参数

console.log("vendorDllConfig", vendorDllConfig.vendors.js);


const assetsPath = dir => path.posix.join(prodConf.assetsPath, dir);

const Dllprod = merge({}, baseConf, {
  mode: "development",
  devtool: "#source-map",
  output: {
    //文件名
    filename: assetsPath("js/[name]_[chunkhash:5].js"),

    //用于打包require.ensure(代码分割)方法中引入的模块
    chunkFilename: assetsPath("js/[name]_[chunkhash:5].js")
  },
  module: {
    rules: styleLoader.styleLoaders({
      extract: true,
      sourceMap: true
    })
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    // 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: vendorDllManifest
    }),
    //压缩js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          // drop_console: true, // 打包后去除console.log
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
          // pure_funcs: ['console.log']
        }
      },
      sourceMap: true,
      parallel: true // 使用多进程并行运行来提高构建速度
    }),

    //作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),

    //根据模块相对路径生成四位数hash值作为模块id
    new webpack.HashedModuleIdsPlugin(),

    //将整个文件复制到构建输出指定目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: prodConf.assetsPath,
        ignore: [".*"]
      },
      {
        from: path.resolve(__dirname, "../dll/static/js"),
        to: path.resolve(__dirname, "../dist/static/js"),
        ignore: [".*"]
      }
    ]),
    // html配置
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      // favicon: path.resolve(__dirname, '../static/favicon.ico'),
      inject: true,
      // 压缩配置
      minify: {
        //删除Html注释
        removeComments: true,
        //去除空格
        collapseWhitespace: true,
        //去除属性引号
        removeAttributeQuotes: true
      }
    }),
    new HtmlIncludeAssetsPlugin({
      assets: [vendorDllConfig.vendors.js], // 添加的资源相对html的路径
      append: false // false 在其他资源的之前添加 true 在其他资源之后添加
    })
  ]
});

// 查看打包内容
if (process.env.analyz_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  prod.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = Dllprod;
