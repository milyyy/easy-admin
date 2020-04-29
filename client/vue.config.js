const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: "./",
  outputPath: "dist",
  assetsDir: "static",
  filenameHashing: true,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
  },
  devServer: {
    host: 'localhost' || '192.168.1.128',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  }
}