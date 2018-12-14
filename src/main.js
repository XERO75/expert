import './assets/iconfont/iconfont.css'
import '../src/assets/css/base.css' /* 引入公共样式 */
import Vue from 'vue'
import Vum from 'vum'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import { router } from './router'
import store from './store.js'

Vue.use(Vum)
Vue.use(ElementUI, {
  size: 'medium',
  zIndex: 3000
})

new Vue({
  router,
  store
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

let startY = 0;
const scrollBox = document.querySelector('.page-content');

document.body.addEventListener('touchstart', (e) => {
  startY = e.touches[0].pageY;
}, { passive: false });

document.body.addEventListener('touchmove', (e) => {
  const moveY = e.touches[0].pageY;
  const top = scrollBox.scrollTop;
  const ch = scrollBox.clientHeight;
  const sh = scrollBox.scrollHeight;
  if (!isChildTarget(e.target, scrollBox)) {
    e.preventDefault();
  } else if ((top === 0 && moveY > startY) || (top + ch === sh && moveY < startY)) {
    e.preventDefault();
  }
}, { passive: false });

function isChildOf(child, parent, justChild = flase) { 
  // justChild为true则只判断是否为子元素，若为false则判断是否为本身或者子元素 默认为false
  let parentNode;
  if (justChild) {
    parentNode = child.parentNode;
  } else {
    parentNode = child;
  }
  
  if (child && parent) {
    while (parentNode) {
      if (parent === parentNode) {
        return true;
      }
      parentNode = parentNode.parentNode;
    }
  }
  return false;
}
