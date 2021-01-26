// const analyzer = require('webpack-bundle-analyzer')
const Compression = require('compression-webpack-plugin')
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://120.27.210.222/test/'
    : '/',
  // publicPath: '/test/',
  // publicPath: 'http://120.27.210.222/test/',
  configureWebpack: config => {
    return {
      plugins: [
        new Compression({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false,
          minRatio: 0.4
        })
      ]
    }
  }
  // chainWebpack: config => {
  //   // config
  //   //   .plugin(new Compression({
  //   //     test: /\.js$|\.html$|\.css/,
  //   //     threshold: 10240,
  //   //     deleteOriginalAssets: false
  //   //   }))
  // }
  // ,
  // chainWebpack: config => {
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(analyzer.BundleAnalyzerPlugin)
  // }
}
