'use strict'
const path = require('path')
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin")

exports.cssLoader = function (opts) {
    function generateLoaders(loader, loaderOpts) {
        const loaders = [{ //默认loader
            loader: 'css-loader',
            options: {
                minimize: process.env.NODE_ENV === 'production',
                sourceMap: opts.sourceMap
            }
        }]
        if (loader) { // 需要增加的loader
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOpts, {
                    sourceMap: opts.sourceMap
                })
            })
        }
        return loader
        if (opts.extract) { //是否需要抽离css
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader',
                publicPath: '../../' //抽离出来的css 添加路径前缀, 让其打包出来的路径正确
            })

        } else {
            return loaders
        }
    }


    return {
        css: generateLoaders(),
        less: generateLoaders('less')
    }
}

exports.styleLoader = function (opts) {
    const output = []
    const cssLoaders = exports.cssLoaders(opts)
    for (let extension in cssLoaders) {
        let loader = cssLoaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'), //路径匹配
            use: loader
        })
    }
    return output
}
exports.cssLoaders = function (opts) {
    opts = opts || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: opts.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            if (loader !== 'postcss') {
                loaders.push({
                    loader: 'postcss-loader',
                    options: Object.assign({}, loaderOptions, {
                        sourceMap: opts.sourceMap
                    })
                })
            }
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: opts.sourceMap

                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (opts.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader'
            })
        } else {
            return ['style-loader'].concat(loaders)
        }
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders('postcss'),
        less: generateLoaders('less'),
        scss: generateLoaders('sass')
    }
}