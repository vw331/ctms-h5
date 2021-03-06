module.exports = {
  configureWebpack: config => {
    console.log(process.env.NODE_ENV)
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "CTMS临床试验项目管理系统";
        return args;
      })
  },
  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    //before: server,
    host: '0.0.0.0',
    port: 9001,
    proxy: { //配置跨域
      '/api': {
        ws: true,
        target: 'http://ctms.starwrap.net:7068',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-size-sm': '13px',
          'font-size-md': '15px',
          'font-size-lg': '17px',
          'goods-action-button-danger-color': '#7232dd',
          'goods-action-button-warning-color': '#3eaf7c'
        }
      }
    }
  }
};