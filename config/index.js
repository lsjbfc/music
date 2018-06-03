const path = require("path");
module.exports = {
  base: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    assetsPath: "static"
  },
  dev: {
    env: "development",
    publicPath: "/",
    assetsPath: "static",
    assetsSubDirectory: "static",
    devtoolType: "cheap-module-eval-source-map",
    assetsPublicPath: "/",
    proxyTable: {
      "*": {
        target: "http://www.storbox.cn", // 你的目标域名
        // http://www.jmapi.cn
        // http://www.storbox.cn
        changeOrigin: true,
        host: "localhost:8090",
        secure: false,
        pathRewrite: {
          // "^/ecm/api/v2": "/"
        }
      }
    },
    host: "0.0.0.0",
    port: 8090,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map",
    cssSourceMap: true
  },
  build: {
    env: "production",
    publicPath: "/",
    assetsPath: "static",
    assetsSubDirectory: "static",
    devtoolType: "source-map"
  }
};
