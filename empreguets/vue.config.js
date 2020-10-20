module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    configureWebpack: {
        output: {
          filename: '[name].[hash:8].js'
        },
      }
}