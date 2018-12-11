import './assets/iconfont/iconfont.css'
import '../src/assets/css/base.css' /* 引入公共样式 */
import Vue from 'vue'
import Vum from 'vum'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import { router } from './router'

Vue.use(Vum)
Vue.use(ElementUI, {
  size: 'medium',
  zIndex: 3000
})

new Vue({
  router
}).$mount('#app')

FastClick.attach(document.body)
// 监听window窗口大小的变化
// window.onresize = setHtmlFontSize
// function setHtmlFontSize () {
//   const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
//   const htmlDom = document.getElementsByTagName('html')[0]
//   htmlDom.style.fontSize = htmlWidth / 20 + 'px'
// }
// setHtmlFontSize()

