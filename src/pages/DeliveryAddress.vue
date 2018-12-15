<template>
<!-- <div class="page"> -->
  <page-content>
      <div class="deliveryAddress ">
        <div class="deliveryAddress-list">
          <div :class="{'deliveryAddress-list__active': status == 'Morning'}" @click="getMorning()" class="deliveryAddress-list__morning">
            <i class="iconfont icon-shangwu2"></i>
            今日上午
          </div>
          <div :class="{'deliveryAddress-list__active': status == 'Afternoon'}" @click="getAfternoon()" class="deliveryAddress-list__afternoon">
            <i class="iconfont icon-xiawu"></i>
            今日下午
          </div>
        </div>
        <vue-better-scroll
          style="height:450px"  
          class="wrapper addressWrap"
          ref="scroll"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingUp="onPullingUp">
          <div></div>
          <div class="deliveryAddress-detail" v-for="item in orderLists" :key="item.index">
            <div class="deliveryAddress-detail__address">
              <span class="fontBold">配送地址:&nbsp;&nbsp;</span>
              <span style="flex-basis:10rem">{{item.memberDistrict}}{{item.gaodeAddress}}{{item.memberAddress}}{{item.memberRoom}}</span>
              <a @click="handleDetail(item.sn)" style="color:#54A93E;">详情</a>
            </div>
            <div class="deliveryAddress-proWrap">
              <span style="margin-bottom:.2rem" class="fontBold">投递产品:</span>
              <div class="deliveryAddress__detailWrap"  v-for="n in item.orderItems" :key="n.index">
                <div class="deliveryAddress__detail">
                  <img class="deliveryAddress-detail__img " :src="n.image" alt="">
                  <span class="deliveryAddress-detail__desc">{{n.productName}}{{n.specifications}}</span>
                </div>
                <span style="align-self:flex-start;">共{{n.totalCount}}/剩{{n.remain}}/日送{{n.number}}</span>
              </div>
            </div>
            <div class="deliveryAddress-detail__clientName">
              <p><span class="fontBold">客户姓名</span>:&nbsp;&nbsp;<span>{{item.memberName}}</span></p>
            </div>
            <div style="margin-top: -.4rem" class="deliveryAddress-detail__clientTel">
              <p><span class="fontBold">客户电话</span>:&nbsp;&nbsp;<span>{{item.memberPhone}}</span></p>
            </div>
          </div>
        </vue-better-scroll>
      </div>
      <toast text="暂无数据" type="error" ref="t2"></toast>
  </page-content>
<!-- </div> -->
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import Vue from 'vue'
// import axios from 'axios'
import { handleLogin } from '../assets/api/login.js'
import { getLists } from '../assets/api/DeliveryAddress.js'
import Scroll from '../../node_modules/vum/src/components/scroll'
import Toast from '../../node_modules/vum/src/components/toast'
// import { VueBetterScroll } from 'vue2-better-scroll'
import VueBetterScroll from 'vue2-better-scroll'


// Vue.use(axios)
let count = 1
export default {
  components: {
    'page-content': Content,
    Scroll,
    Toast,
    VueBetterScroll
    // VueBetterScroll
  },
  data () {
    return {
      address: 'china',
      productDescription: '谷元黑米牛奶饮品236ml',
      clientName: 'ox',
      clientTel: 12321321321,
      total: 100,
      left: 22,
      daily: 1,

      status: 'Morning',
      pageNumber: 1,
      totalPage: 1,
      orderLists: [],
      productLists: [],
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      // scrollbarObj: {
      //   fade: true
      // },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      // pullDownRefreshObj: {
      //   threshold: 90,
      //   stop: 40
      // },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
      threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '暂无更多'
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
    getMorning () {
      this.status = 'Morning'
      this.pageNumber = 1
      getLists(this.status, this.pageNumber).then(res => {
        if (res.data.code == 0) {
          this.orderLists = res.data.data.content
          this.pageNumber = res.data.data.pageNumber
          this.totalPage = res.data.data.totalPage
          this.$refs.scroll.forceUpdate(true)
        } else {
          this.orderLists = null
          this.$refs.scroll.forceUpdate(false)
        }
      })
    },
    getAfternoon () {
      this.status = 'Afternoon'
      this.pageNumber = 1
      getLists(this.status, this.pageNumber).then(res => {
        if (res.data.code == 0) {
          this.orderLists = res.data.data.content
          this.$refs.scroll.forceUpdate(true)
        } else {
          this.orderLists = null
          this.$refs.scroll.forceUpdate(false)
        }
      })
    },
    handleDetail(sn) {
      this.$router.push({path:'/orderDetail', query:{sn:sn}})
    },
    // 模拟数据请求
    // getData () {
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     const arr = []
      //     for (let i = 0; i < 20; i++) {
      //       arr.push(count++)
      //     }
      //     resolve(arr)
      //   }, 1000)
      // })
    // },
    // onPullingDown () {
    //   // 模拟下拉刷新
    //   console.log('下拉刷新')
    //   count = 0
    //   this.getData().then(res => {
    //     this.items = res
    //     this.$refs.scroll.forceUpdate(true)
    //   })
    // },
    onPullingUp () {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      console.log('total',this.totalPage);
      
      setTimeout(() => {
        self = this
        this.pageNumber ++
        if (this.totalPage >= this.pageNumber) {
          getLists(this.status, this.pageNumber).then(res => {
            this.orderLists = this.orderLists.concat(res.data.data.content)
            this.$refs.scroll.forceUpdate(true)
          })
        } else {
          console.log('close');
          this.$refs.scroll.forceUpdate(false)
        }
      }, 500);
      // this.getData().then(res => {
      //   this.items = this.items.concat(res)
      //   if(count<50){
      //     this.$refs.scroll.forceUpdate(true)
      //   }else{
      //     this.$refs.scroll.forceUpdate(false)
      //   }
      // })
    }
  },
  mounted () {
    // this.onPullingDown()
    // handleLogin().then(res => {
      this.getMorning()
    // })
  }
}
</script>
<style lang="less">
  * {
    font-size: 12px;
  }
  .fontBold {
    font-weight: bold;
  }
  .iconfont {
    font-size: .6rem;
  }
  .deliveryAddress {
    max-height: 100px;
  }
  .deliveryAddress-list {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin: .8rem 0 .5rem;
    font-size: .4rem;
  }
  .deliveryAddress-list__morning {
    width: 7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: rgb(226, 226, 226);
  }
  
  .deliveryAddress-list__afternoon {
    width: 7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: rgb(226, 226, 226);
  }
  
  .deliveryAddress-list__active {
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  .deliveryAddress-detail {
    display: flex;
    flex-direction: column;
    height: 11rem;
    margin: 0 .8rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid rgb(226, 226, 226);
  }
  .deliveryAddress-detail__address {
    margin: 1rem 0 .5rem;
  }
  .deliveryAddress-detail__address,
  .deliveryAddress-detail__clientName,
  .deliveryAddress-proWrap,
  .deliveryAddress-detail__clientTel {
    display: flex;
    justify-content: space-between;
    border-bottom: none;
  }
  .deliveryAddress-proWrap {
    flex-direction: column;
  }
  .deliveryAddress-detail__img {
    width: auto;
    height: 2.2rem;
  }
  .deliveryAddress-detail__desc {
    margin-left: .4rem;
    overflow: hidden;
  }
  .deliveryAddress__detailWrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: .2rem;
    // align-items: center;
  }
  .deliveryAddress__detail {
    width: 7rem;
    display: flex;
    justify-content: flex-start;
  }
  .wrapper {
    background: white;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .addressWrap {
    .pullup-wrapper {
      padding: 10px 0 50px;
    }
  }
</style>

