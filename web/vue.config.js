// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const publicPath = process.env.NODE_ENV === "production" ? "/static/" : "./"; //font scss资源路径 不同环境切换控制
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  productionSourceMap:false,
    devServer: {    
      port: 8000, // 端口号
      host: '172.100.0.230',
      // host: '0.0.0.0',
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      hotOnly: true, // 热更新
      proxy: {
        '/*': {
            target: 'http://172.100.0.230:7030/',//测试
              changeOrigin: true,
              secure: false
          },
      }
    },
  // configureWebpack: {
  //       plugins: [
  //           new CompressionWebpackPlugin({
  //               filename: '[path].gz[query]',
  //               algorithm: 'gzip',
  //               test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //               threshold: 8192,
  //               minRatio: 0.8
  //           })
  //       ],
  //       performance: {
  //           hints:'warning',
  //           //入口起点的最大体积 整数类型（以字节为单位）
  //           maxEntrypointSize: 50000000,
  //           //生成文件的最大体积 整数类型（以字节为单位 300k）
  //           maxAssetSize: 30000000,
  //           //只给出 js 文件的性能提示
  //           assetFilter: function(assetFilename) {
  //               return assetFilename.endsWith('.js');
  //           }
  //       }
  //   }
}
