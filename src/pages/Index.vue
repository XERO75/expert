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
    },
    // bodyScroll(event) {
    //   event.preventDefault(); 
    // },
  //   stopDrop () {
  //     var lastY;//最后一次y坐标点
  //     let body = document.querySelector('body')
  //     body.addEventListener('touchstart', function(event) {
  //         lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
  //     });
  //     body.addEventListener('touchmove', function(event) {
  //         var y = event.originalEvent.changedTouches[0].clientY;
  //         var st = $(this).scrollTop(); //滚动条高度  
  //         if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
  //             lastY = y;
  //             event.preventDefault();
  //         }
  //         lastY = y;
  //  
  //     });
  //   }
  },
  mounted() {
    if (this.$route.query.currentView) {
      this.changeView((this.$route.query.currentView).toLowerCase())
      if (this.$route.query.type == 2 ) {
        // this.$refs.person.test()
      }
    }
    // this.stopDrop()
    // document.body.addEventListener('touchmove',this.bodyScroll,{passive: false});
  },
  destroyed() {
    // document.body.removeEventListener('touchmove',this.bodyScroll,{passive: false}); 
  },
}
</script>

<style lang="less" scoped>
@import '../../node_modules/vum/src/components/footer/footer.less';
@footer-height:   2.5rem;
.iconfont {
  font-size: 1rem;
}
.footer-font {
  font-size: .5rem;
}
</style>

