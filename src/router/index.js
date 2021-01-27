import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/homePage/index'
import Index from '../pages/index/index'
import Pdf from '../pages/pdf/index'
import Move from '../pages/move/index'

Vue.use(VueRouter)
export default new VueRouter({
  base: '/test/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/pdf',
      name: 'Pdf',
      component: Pdf
    },
    {
      path: '/move',
      name: 'Move',
      component: Move
    },
    {
      path: '/canvas',
      name: 'Canvas',
      component: () => import('@/pages/canvas/index')
    },
    {
      path: '/qusetion',
      name: 'Qusetion',
      component: () => import('@/pages/qusetion/index')
    }
  ]
})
