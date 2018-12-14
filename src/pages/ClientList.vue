<template>
  <page-content>
    <vue-better-scroll
          style="height:600px"  
          class="wrapper clientWrap"
          ref="scroll"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingUp="onPullingUp">
    <div class="client" v-for="item in orderLists" :key="item.index">
      <div class="client-detail__name">
        <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{item.memberName}}</p>
        <a @click="handleCheck(item.sn)" style="color:#54A93E;">详情</a>
      </div>
      <div class="client-detail__tel">
        <p><span class="fontBold">电话:&nbsp;&nbsp;</span>{{item.memberPhone}}</p>
      </div>
      <div class="client-product__detailWrap" v-for="n in item.orderItems" :key="n.index">
        <div class="client-product__detail">
          <img class="client-product__img" :src="n.image" alt="">
          <span class="client-product__desc">{{n.productName}}{{n.specifications}}</span>
        </div>
        <span>共{{n.totalCount}}/剩{{n.remain}}/日送{{n.number}}</span>
      </div>
      <div class="client-detail__address">
        <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{item.memberDistrict}}{{item.gaodeAddress}}{{item.memberAddress}}</p>
      </div>
    </div>
    </vue-better-scroll>
    <toast text="暂无数据" type="error" ref="t2"></toast>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import { handleLogin } from "../assets/api/login.js";
import { getOrder } from '../assets/api/clientList.js'
import Toast from '../../node_modules/vum/src/components/toast'
import VueBetterScroll from 'vue2-better-scroll'


export default {
  components: {
    'page-content': Content,
    Toast,
    VueBetterScroll


  },
  data () {
    return {
      id: '',
      opr:'first',
      orderLists: [],
      minId:'',
      // productLists: []
      pullUpLoadObj: {
      threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '无更多数据'
        }
      },
      startY: 0,  // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: []
    }
  },
  methods: {
    handleNext() {
      getOrder('next', this.maxId).then(res => {
        console.log(res);
      })
    },
    handleCheck(sn) {
      this.$router.push({path:'/orderDetail',query:{sn}})
    },
    onPullingUp () {
      console.log('上拉加载')
      this.minId = Math.min.apply(Math,this.orderLists.map(function(o){return o.id;}))
      if (this.minId) {
        setTimeout(() => {
          getOrder('next', this.minId).then(res => {
            if (res.data.data.content !== null) {
              this.orderLists = this.orderLists.concat(res.data.data.content)
              this.$refs.scroll.forceUpdate(true)
            } else {
              this.$refs.scroll.forceUpdate(false)
            }
          })
        }, 500);
      } else {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate(false)
        }, 1000);
      }
    }
  },
  mounted () {
    handleLogin().then(res => {
      getOrder(this.opr, this.id).then(res => {
        this.orderLists = res.data.data.content
        this.minId = Math.min.apply(Math,this.orderLists.map(function(o){return o.id;}))
        console.log('mounted',this.minId);
      })
    })
  }
}
</script>
<style lang="less">
  .client {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    height: 11rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgb(226, 226, 226);
  }
  .client-detail__name,
  .client-detail__tel,
  // .client-product__detailWrap,
  .client-detail__address {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .client-product__detailWrap {
    // margin-top: .3rem;
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .client-product__detailWrap {
    margin: .5rem 0;
  }
  .client-product__detail {
    display: flex;
    justify-content: space-between;
  }
  .client-product__img {
    width: auto;
    height: 2.5rem;
  }
  .client-product__desc {
    display: inline-block;
    margin-left: .3rem;
    // overflow: hidden;
    width: 5rem;
  }
  .clientWrap {
    background: white;
    overflow: scroll;
    .pullup-wrapper {
      padding: 0 0 200px;
    }
  }
</style>
