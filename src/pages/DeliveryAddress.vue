<template>
  <page-content>
      <div class="deliveryAddress ">
        <div class="deliveryAddress-list">
          <div :class="{'deliveryAddress-list__active': type == 1}" @click="getMorning()" class="deliveryAddress-list__morning">
            <i class="iconfont icon-shangwu2"></i>
            今日上午
          </div>
          <div :class="{'deliveryAddress-list__active': type == 2}" @click="getAfternoon()" class="deliveryAddress-list__afternoon">
            <i class="iconfont icon-xiawu"></i>
            今日下午
          </div>
        </div>
        <div class="deliveryAddress-detail">
          <div class="deliveryAddress-detail__address">
            <p><span class="fontBold">配送地址:&nbsp;&nbsp;</span>{{address}}</p>
            <router-link style="align-self:center; color:#54A93E;" :to="{ path: 'orderDetail' }">
              详情
            </router-link>
          </div>
          <div class="deliveryAddress-proWrap">
            <span style="margin-bottom:.4rem" class="fontBold">投递产品:</span>
            <div class="deliveryAddress__detailWrap">
              <div class="deliveryAddress__detail">
                <img class="deliveryAddress-detail__img " src="../assets/img/index/milk.png" alt="">
                <span class="deliveryAddress-detail__desc">{{productDescription}}</span>
              </div>
              <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
            </div>
          </div>
          <div class="deliveryAddress-detail__clientName">
            <p><span class="fontBold">客户姓名</span>:&nbsp;&nbsp;<span>{{clientName}}</span></p>
          </div>
          <div style="margin-top: -.4rem" class="deliveryAddress-detail__clientTel">
            <p><span class="fontBold">客户电话</span>:&nbsp;&nbsp;<span>{{clientTel}}</span></p>
          </div>
        </div>
      </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import Vue from 'vue'
import axios from 'axios'
import { handleLogin } from '../assets/api/login.js'

Vue.use(axios)
export default {
  components: {
    'page-content': Content,
  },
  data () {
    return {
      type: 1,
      address: 'china',
      productDescription: '谷元黑米牛奶饮品236ml',
      clientName: 'ox',
      clientTel: 12321321321,
      total: 100,
      left: 22,
      daily: 1,
    }
  },
  methods: {
    getMorning () {
      this.type = 1
    },
    getAfternoon () {
      this.type = 2
    },
    
  },
  mounted () {
    handleLogin().then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="less" >
  * {
    font-size: .5rem;
  }
  .fontBold {
    font-weight: bold;
  }
  .iconfont {
    font-size: .4rem;
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
    height: 9rem;
    margin: 0 .8rem;
    border-bottom: 1px solid rgb(226, 226, 226);
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
    height: 2.5rem;
  }
  .deliveryAddress-detail__desc {
    margin-left: .4rem;
    overflow: hidden;
    // width: 9rem;
  }
  .deliveryAddress__detailWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

