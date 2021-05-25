module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pj__wbs/' : '/',
  transpileDependencies: ['vuex-module-decorators'],
  productionSourceMap: false
};