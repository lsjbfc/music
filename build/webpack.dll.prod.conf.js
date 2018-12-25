"use strict";
process.env.NODE_ENV = "production";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const vendorDllConfig = require("../dll/vendor.config.json");
const vendorDllManifest = require("../dll/vendors.manifest.json");
// const HappyPackPlugin = require("./happypack.config");
const env = require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  mode: "production",
  // devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash:7].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash:7].js")
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: true,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      })
    ],
    minimize: true, //是否进行代码压缩
    splitChunks: {
      chunks: "async",
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        styles: {
          name: "common",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: vendorDllManifest
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:7].css"),
      chunkFilename: "css/[name].[contenthash:7].css", // use contenthash *
      // allChunks: true
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "none",
      favicon: path.resolve(__dirname, "../src/assets/favicon.ico")
    }),
    new HtmlIncludeAssetsPlugin({
      assets: [vendorDllConfig.vendors.js], // 添加的资源相对html的路径
      append: false // false 在其他资源的之前添加 true 在其他资源之后添加
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      },
      {
        from: path.resolve(__dirname, "../dll/static/js/"),
        to: path.resolve(__dirname, "../dist/static/js"),
        ignore: [".*"]
      }
    ])
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
