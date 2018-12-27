"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const Happypack = require("happypack");
// require("./bug.js");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const publicPath = () => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.servermode) {
      return config.build.assetsPublicPathServer;
    } else {
      // console.log("publicPath", config.build.assetsPublicPath);
      return config.build.assetsPublicPath;
    }
  } else {
    return config.dev.assetsPublicPath;
  }
};
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});
// console.log("publicPath", publicPath(), process.env.servermode);
const webpackConfig = {
  context: path.resolve(__dirname, "../"),
  entry: {
    // browserTip: "./src/common/browser-tip.js",
    app: "./src/main.ts"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: publicPath()
  },
  resolve: {
    extensions: [".js", ".vue", ".json", "less"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "happypack/loader?id=babel",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "happypack/loader?id=image",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "happypack/loader?id=video",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "happypack/loader?id=font",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Happypack({
      id: "babel",
      loaders: ["babel-loader"]
    }),
    new Happypack({
      id: "image",
      loaders: ["url-loader"]
    }),
    new Happypack({
      id: "video",
      loaders: ["url-loader"]
    }),
    new Happypack({
      id: "font",
      loaders: ["url-loader"]
    }),
    new Happypack({
      id: "ts",
      loaders: ["ts-loader"]
    })
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require(path.join(__dirname, '..', '/static/js', 'manifest.json')),
    // })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
module.exports = webpackConfig;
