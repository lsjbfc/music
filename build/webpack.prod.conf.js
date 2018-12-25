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
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash:7].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash:7].js")
  },
  splitChunks: {
    chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"    minSize: 0, // 最小尺寸，默认0   minChunks: 1, // 最小 chunk ，默认1   maxAsyncRequests: 1, // 最大异步请求数， 默认1   maxInitialRequests : 1, // 最大初始化请求书，默认1   name: function(){}, // 名称，此选项可接收 function   cacheGroups:{ // 这里开始设置缓存的 chunks     priority: 0, // 缓存组优先级     vendor: { // key 为entry中定义的 入口名称       chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)        test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk       name: "vendor", // 要缓存的 分隔出来的 chunk 名称        minSize: 0,       minChunks: 1,       enforce: true,       maxAsyncRequests: 1, // 最大异步请求数， 默认1       maxInitialRequests : 1, // 最大初始化请求书，默认1       reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）     }   } } },
    minSize: 0, // 最小尺寸，默认0
    minChunks: 1, // 最小 chunk ，默认1
    maxAsyncRequests: 1, // 最大异步请求数， 默认1
    maxInitialRequests: 1, // 最大初始化请求书，默认1
    name: function() {}, // 名称，此选项可接收 function
    cacheGroups: {
      // 这里开始设置缓存的 chunks
      priority: 0, // 缓存组优先级
      vendor: {
        // key 为entry中定义的 入口名称
        chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
        name: "vendor", // 要缓存的 分隔出来的 chunk 名称
        minSize: 0,
        minChunks: 1,
        enforce: true,
        maxAsyncRequests: 1, // 最大异步请求数， 默认1
        maxInitialRequests: 1, // 最大初始化请求书，默认1
        reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
      }
    }
  },
 
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    // MiniCssExtractPlugin
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:7].css"),
      allChunks: true
    }),
  
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency",
      favicon: path.resolve(__dirname, "../src/assets/favicon.ico")
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
