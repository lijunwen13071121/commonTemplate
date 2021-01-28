import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
window.onresize = function() {
  document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
