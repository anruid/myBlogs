// 配置打包文件大小以及依赖插件查看
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 配置压缩插件gzi
const path =require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {

  chainWebpack: config => {
    config
      .module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
       /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
          config
              .plugin('webpack-bundle-analyzer')
              .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
              .end();
          config.plugins.delete('prefetch')
      }
  }

  },
  configureWebpack: {
    plugins: [new CompressionPlugin({
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      threshold: 10240, // 对超过10k的数据进行压缩
      deleteOriginalAssets: false // 是否删除原文件
    })],
    resolve:{
      alias:{
        assets: resolve('src/assets')
      }
    }
  }
}
