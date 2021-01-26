export default {
  install(Vue) {
    console.log('useTest')
    Vue.prototype.$useTest = 'useTest'
  }
}
