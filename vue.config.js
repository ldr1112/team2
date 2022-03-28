const { VUE_APP_SERVER } = process.env

module.exports = {
  devServer: {
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  },
  runtimeCompiler: true
}
