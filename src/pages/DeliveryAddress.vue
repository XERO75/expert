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
            <span style="margin-bottom:.4rem">投递产品:</span>
            <div class="deliveryAddress__detailWrap">
              <div class="deliveryAddress__detail">
                <img class="deliveryAddress-detail__img " src="../assets/img/index/milk.png" alt="">
                <span class="deliveryAddress-detail__desc">{{productDescription}}</span>
              </div>
              <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
            </div>
          </div>
          <div class="deliveryAddress-detail__clientName">
            <p>客户姓名:&nbsp;&nbsp;<span>{{clientName}}</span></p>
          </div>
          <div style="margin-top: -.4rem" class="deliveryAddress-detail__clientTel">
            <p>客户电话:&nbsp;&nbsp;<span>{{clientTel}}</span></p>
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
            <span style="margin-bottom:.4rem">投递产品:</span>
            <div class="deliveryAddress__detailWrap">
              <div class="deliveryAddress__detail">
                <img class="deliveryAddress-detail__img " src="../assets/img/index/milk.png" alt="">
                <span class="deliveryAddress-detail__desc">{{productDescription}}</span>
              </div>
              <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
            </div>
          </div>
          <div class="deliveryAddress-detail__clientName">
            <p>客户姓名:&nbsp;&nbsp;<span>{{clientName}}</span></p>
          </div>
          <div style="margin-top: -.4rem" class="deliveryAddress-detail__clientTel">
            <p>客户电话:&nbsp;&nbsp;<span>{{clientTel}}</span></p>
          </div>
        </div>
        <div class="deliveryAddress-detail">
          <div class="deliveryAddress-detail__address">
            <p><span class="fontBold">配送地址:&nbsp;&nbsp;</span>{{address}}</p>
            <router-link style="align-self:center; color:#54A93E;" :to="{ path: 'billDetail' }">
              详情
            </router-link>
          </div>
          <div class="deliveryAddress-proWrap">
            <span style="margin-bottom:.4rem">投递产品:</span>
            <div class="deliveryAddress__detailWrap">
              <div class="deliveryAddress__detail">
                <img class="deliveryAddress-detail__img " src="../assets/img/index/milk.png" alt="">
                <span class="deliveryAddress-detail__desc">{{productDescription}}</span>
              </div>
              <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
            </div>
          </div>
          <div class="deliveryAddress-detail__clientName">
            <p>客户姓名:&nbsp;&nbsp;<span>{{clientName}}</span></p>
          </div>
          <div style="margin-top: -.4rem" class="deliveryAddress-detail__clientTel">
            <p>客户电话:&nbsp;&nbsp;<span>{{clientTel}}</span></p>
          </div>
        </div>
      </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
// import MescrollVue from 'mescroll.js/mescroll.vue' // { MeScroll }
import Vue from 'vue'
import axios from 'axios'
import { handleLogin } from '../assets/api/login.js'

Vue.use(axios)
export default {
  components: {
    'page-content': Content,
    // MescrollVue
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
  // body, 
  // html {
  //     margin: 0;
  //     padding: 0;
  //     height: 100%;
  //     .local_scroll {
  //         position:absolute; 
  //         overflow:scroll; 
  //         -webkit-overflow-scrolling: touch; 
  //         top:0; 
  //         left:0; 
  //         bottom:0; 
  //         right:0;
  //     }
  //     ::-webkit-scrollbar{
  //         width: 0px; height: 0px;background-color: #fff;  
  //     }
  // }
  * {
    font-size: .4rem;
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
    width: 4.5rem;
    height: 1rem;
    line-height: 1rem;
    background: rgb(226, 226, 226);
  }
  
  .deliveryAddress-list__afternoon {
    width: 4.5rem;
    height: 1rem;
    line-height: 1rem;
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
    margin: 0 .4rem;
    border-bottom: 2px solid rgb(226, 226, 226);
    // justify-content: center;
    // height: 6rem;
  }
  .deliveryAddress-detail__address,
  .deliveryAddress-detail__clientName,
  .deliveryAddress-proWrap,
  .deliveryAddress-detail__clientTel {
    display: flex;
    justify-content: space-between;
    // padding: 0 .4rem;
    border-bottom: none;
    // margin-bottom: -.4rem;   
  }
  .deliveryAddress-proWrap {
    flex-direction: column;
  }
  .deliveryAddress-detail__img {
    width: auto;
    height: 1.5rem;
  }
  .deliveryAddress-detail__desc {
    margin-left: .4rem;
    overflow: hidden;
    width: 7rem;
  }
  .deliveryAddress__detailWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: .2rem;
  }
  .deliveryAddress__detail {
    width: 5rem;
    display: flex;
    justify-content: flex-start;
    // margin-right: -2rem;
  }
  #mescroll {
    min-height:100px;
    -webkit-overflow-scrolling: touch;
  }
</style>

