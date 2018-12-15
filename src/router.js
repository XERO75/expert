import Vue from 'vue'
// import Vum from 'vum'
import Router from 'vue-router'

import Index from './pages/Index'
import OrderDetail from './pages/OrderDetail.vue'
import Bind from './pages/bind.vue'
import Login from './pages/login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    }
  ]
})
// Vum.router(router)

export {
  router
}
