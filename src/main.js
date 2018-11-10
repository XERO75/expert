import './assets/iconfont/iconfont.css'
import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import Vum from 'vum'

// pages
import Index from './pages/Index'

import './plugins/element.js'
// import Home from './pages/Home.vue'

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

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // }
  ]
})

new Vue({
  router
}).$mount('#app')

Vum.router(router) // config router by vum

FastClick.attach(document.body)
