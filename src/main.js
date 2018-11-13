import './assets/iconfont/iconfont.css'
import '../src/assets/css/base.css' /* 引入公共样式 */
import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import Vum from 'vum'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// pages
import './plugins/element.js'
import Index from './pages/Index'
import OrderDetail from './pages/OrderDetail.vue'

// 监听window窗口大小的变化
window.onresize = setHtmlFontSize
function setHtmlFontSize () {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
}
setHtmlFontSize()

Vue.use(Router)
Vue.use(Vum)
Vue.use(ElementUI, {
  size: 'medium',
  zIndex: 3000
})

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    }
    // {
    //   path: '/',
    //   name: 'order-detail',
    //   component: OrderDetail
    // }
  ]
})

new Vue({
  router
}).$mount('#app')

Vum.router(router) // config router by vum

FastClick.attach(document.body)
