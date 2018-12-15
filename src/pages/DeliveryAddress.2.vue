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
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="margin-top:50px">
        <div></div>
        <div class="deliveryAddress-detail" v-for="item in orderLists" :key="item.index">
          <div class="deliveryAddress-detail__address">
            <span class="fontBold">配送地址:&nbsp;&nbsp;</span>
            <span style="flex-basis:10rem">{{item.memberDistrict}}{{item.gaodeAddress}}{{item.memberAddress}}{{item.memberRoom}}</span>
            <a @click="handleDetail(item.sn)" style="color:#54A93E;">详情</a>
          </div>
          <div class="deliveryAddress-proWrap">
            <span style="margin-bottom:.6rem" class="fontBold">投递产品:</span>
            <div class="deliveryAddress__detailWrap"  v-for="n in item.orderItemList" :key="n.index">
              <div class="deliveryAddress__detail">
                <img class="deliveryAddress-detail__img " :src="item.image" alt="">
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
        </scroll>
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


// Vue.use(axios)
export default {
  components: {
    'page-content': Content,
    Scroll,
    Toast
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
      productLists: []
    }
  },
  methods: {
    getMorning () {
      this.status = 'Morning'
      this.pageNumber = 1
      getLists(this.status, this.pageNumber).then(res => {
        this.orderLists = res.data.data.content
      })
    },
    getAfternoon () {
      this.status = 'Afternoon'
      this.pageNumber = 1
      getLists(this.status, this.pageNumber).then(res => {
        if (res.data.code == 0) {
          this.orderLists = res.data.data.content
        } else {
          this.orderLists = null
        }
      })
    },
    handleDetail(sn) {
      this.$router.push({path:'/orderDetail', query:{sn:sn}})
    },
    onRefresh (done) {
      let self = this
      setTimeout(function () {
        self.time = new Date()
        done()  // call done
      }, 1000)
    },
    onInfinite (done) {
      let self = this
      if (self.pageNumber > self.pageNumber) {
        self.pageNumber ++ 
        setTimeout(function () {
          getLists(self.status, self.pageNumber).then(res => {
            self.orderLists.push(res.data.data.content)
          })
          done()
        }, 1000)
      } else self.$refs.t2.open()
    }
  },
  mounted () {
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
    margin-top: .8rem;
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
    height: 10rem;
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
    // align-items: center;
  }
  .deliveryAddress__detail {
    width: 7rem;
    display: flex;
    justify-content: flex-start;
  }
  #mescroll {
    min-height:100px;
    -webkit-overflow-scrolling: touch;
  }
</style>

