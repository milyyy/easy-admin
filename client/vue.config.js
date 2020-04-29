const path = require("path")
const dev = process.env.NODE_ENV !== 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  filenameHashing: true,
  runtimeCompiler: true,        // 运行时版本是否需要编译
  transpileDependencies: [],    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false,    // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (dev) { // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else {    // 生产环境配置
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 9000,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api/', // 服务器请求接口地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
  pluginOptions: { // 第三方插件配置
  },
}