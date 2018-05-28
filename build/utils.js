const path = require('path')
const glob = require('glob')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.template = function (options) {
  options = options || {}

  function template(loader, loaderOptions) {
    var loaders = [];
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {})
    })
    return loaders;
  }
  return {
    art: template('art-template')
  }
}

// exports.getPages = function () {
//   var pageDir = path.resolve(__dirname, '../src/pages/');
//   var pageFiles = glob.sync(pageDir + '/*.html');
//   return pageFiles.map(p => [path.relative(pageDir, p).split(path.sep).slice(0, -1).join('/'), p])
// }

exports.getEntries = function () {
  let jsDir = path.resolve(__dirname, '../src/js/');
  let entryFiles = glob.sync(jsDir + '/**/*.*');
  let map = {};
  entryFiles.forEach(function (filePath) {
    let filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  });
  return map;
}
exports.getHtmlPlugins = function () {
  let pageDir = path.resolve(__dirname, '../src/pages/');
  let pageFiles = glob.sync(pageDir + '/**/*.html');
  let array = [];
  pageFiles.forEach(function (filePath) {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    array.push(new HtmlWebpackPlugin({
      template: filePath,
      filename: filename + '.html',
      inject: "body",
      chunks: ['manifest', 'vendor',filename],
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['manifest', 'vendor', filename]
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
      minimize: 3,
      minify: {
        // removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
      // favicon: path.resolve(__dirname, '../src/img/shenjuzijia.ico')
    }));
  });
  return array;
}