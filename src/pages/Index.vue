<template>
  <div class="page">
    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'delivery-address' }" @click.native="changeView('delivery-address')">
        <i class="iconfont icon-icon-test"></i>
        <label class="footer-font">配送地址</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'deliever-order' }" @click.native="changeView('deliever-order')">
        <i class="iconfont icon-tongji"></i>
        <label class="footer-font">取货统计</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'search' }" @click.native="changeView('search')">
        <i class="iconfont icon-sousuo"></i>
        <label class="footer-font">搜索</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'order-detail' }" @click.native="changeView('order-detail')">
        <i class="iconfont icon-duoren"></i>
        <label class="footer-font">客户列表</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'courier' }" @click.native="changeView('courier')">
        <i class="iconfont icon-ren1"></i>
        <label class="footer-font">个人中心</label>
      </footer-item>
    </page-footer>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
import Page from '../../node_modules/vum/src/components/page'
import { Footer, Item } from '../../node_modules/vum/src/components/footer'
import { SimpleHeader } from '../../node_modules/vum/src/components/header'
import Content from '../../node_modules/vum/src/components/content'
import DeliveryAddress from './DeliveryAddress'

export default {
  components: {
    Page,
    SimpleHeader,
    'delivery-address': DeliveryAddress,
    'page-content': Content,
    'page-footer': Footer,
    'footer-item': Item
  },
  data () {
    return {
      currentView: 'delivery-address'
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: .7rem;
}
.footer-font {
  font-size: .2rem;
}
</style>

