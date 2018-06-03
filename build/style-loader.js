"use strict";
const path = require("path");
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.cssLoaders = function(options) {
  options = options || {};

  var cssLoader = {
    loader: "css-loader",
    // include: path.resolve(__dirname, '../src/'),
    options: {
      minimize: process.env.NODE_ENV === "production",
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader];
    if (loader) {
      if (loader !== "postcss") {
        loaders.push({
          loader: "postcss-loader",
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        });
      }
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: "style-loader"
      });
    } else {
      return ["style-loader"].concat(loaders);
    }
  }



  return {
    css: generateLoaders(),
    postcss: generateLoaders("postcss"),
    less: generateLoaders("less"),
    scss: generateLoaders("sass"),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      include: [path.resolve(__dirname, "../src/")],
      exclude: /node_modules/,
      use: loader
    });
  }
  return output;
};
