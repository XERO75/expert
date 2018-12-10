<template>
  <div class="page">
    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'delivery-address' }" @click.native="changeView('delivery-address')">
        <i class="iconfont icon-icon-test"></i>
        <label class="footer-font">配送地址</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'statistics' }" @click.native="changeView('statistics')">
        <i class="iconfont icon-tongji"></i>
        <label class="footer-font">取货统计</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'search' }" @click.native="changeView('search')">
        <i class="iconfont icon-sousuo"></i>
        <label class="footer-font">搜索</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'client-list' }" @click.native="changeView('client-list')">
        <i class="iconfont icon-duoren"></i>
        <label class="footer-font">客户列表</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'personal' }" @click.native="changeView('personal')">
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
import Content from '../../node_modules/vum/src/components/content'
import DeliveryAddress from './DeliveryAddress'
import Statistics from './Statistics.vue'
import Search from './Search.vue'
import ClientList from './ClientList.vue'
import Personal from './Personal.vue'
import OrderDetail from './OrderDetail.vue'

export default {
  components: {
    Page,
    'page-content': Content,
    'page-footer': Footer,
    'footer-item': Item,
    'delivery-address': DeliveryAddress,
    'statistics': Statistics,
    'search': Search,
    'client-list': ClientList,
    'personal': Personal,
    'order-detail': OrderDetail
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
@import '../../node_modules/vum/src/components/footer/footer.less';
@footer-height:   2.8rem;
.iconfont {
  font-size: .9rem;
}
.footer-font {
  font-size: .4rem;
}
</style>

