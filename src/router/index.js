import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/homePage/index'
import Index from '../pages/index/index'
import Pdf from '../pages/pdf/index'
import Move from '../pages/move/index'
import Canvas from '../pages/canvas/index'
import Draw from '../pages/canvas/draw'
import CanvasTest from '../pages/canvas/test'

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
      component: Canvas
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/canvasTest',
      name: 'CanvasTest',
      component: CanvasTest
    },
    {
      path: '/Use1',
      name: 'Use1',
      component: () => import('@/pages/vueUse/index')
    },
    {
      path: '/Use2',
      name: 'Use2',
      component: () => import('@/pages/vueUse/index2')
    }
  ]
})
