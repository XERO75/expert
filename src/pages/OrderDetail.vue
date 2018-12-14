<template>
  <div class="page">
    <page-content >
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.2rem; font-size:.7rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{orderData.memberName}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{orderData.memberPhone}}</span>
        </div>
        <div class="order-client__address">
          <span style="width:30%" class="boldFont">地址</span>
          <span>{{orderData.memberDistrict}}{{orderData.memberAddress}}{{orderData.gaodeAddress}}{{orderData.memberRoom}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span v-if="orderData.orderStatus == 'HoldDelivery'">暂停派送</span>
          <span  v-if="orderData.orderStatus == 'OnDelivery'">正常派送</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; margin-bottom:.2rem; font-size:.7rem">产品</span>
        <div class="order-product__detailWrap" v-for="n in orderData.orderItemList" :key="n.index">
          <div class="order-product__detail">
            <img class="order-product__img" src="../assets/img/index/milk.png" alt="">
            <span class="order-product__desc">{{n.productName}}{{n.specifications}}</span>
          </div>
          <span>共{{n.totalCount}}/剩{{n.remain}}/日送{{n.number}}</span>
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{orderData.beginDate}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{orderData.deliverType}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{orderData.halfDateType}}</span>
        </div>
      </div>
      <div class="order-footer">
        <m-button @click.native="handleStop" v-if="orderData.orderStatus == 'OnDelivery'" size="large" >暂停送奶</m-button>
        <m-button @click.native="handleContinue" v-if="orderData.orderStatus == 'HoldDelivery'" size="large" disable >继续送奶</m-button>
      </div>
    </page-content>
    <toast text="已暂停" ref="t1"></toast>
    <toast text="确认继续" ref="t2"></toast>
  </div>
</template>

<script>
import { Footer } from '../../node_modules/vum/src/components/footer'
import Content from '../../node_modules/vum/src/components/content'
import Icon from '../../node_modules/vum/src/components/icons'
import { Button } from '../../node_modules/vum/src/components/buttons'
import { handleLogin } from '../assets/api/login.js'
import { getDetails, changeStatus } from '../assets/api/OrderDetail.js'
import Toast from '../../node_modules/vum/src/components/toast'

 
export default {
  components: {
    'page-content': Content,
    // 'btn': Button,
    Icon,
    'm-button': Button,
    'page-footer': Footer,
    Toast

  },
  data () {
    return {
      name: 'jack',
      tel: 11244444444,
      address: 'tianhe distict zhujiang new town',
      status: 'normal',
      total: 3,
      left: 1,
      daily: 1,
      startData: '2018/1/1',
      deliveryCycle: '周一到周日',
      deliveryTime: '上午',
      productDescription: '谷元黑米牛奶饮品236ml',

      orderData: {}
    }
  },
  methods: {
    handleDetail() {
      getDetails(this.$route.query.sn).then(res => {
        this.orderData = res.data.data
      })
    },
    handleStop() {
      let formdata = new FormData()
      formdata.append('sn', this.$route.query.sn)
      formdata.append('orderStatus', 'HoldDelivery')
      changeStatus(formdata).then(res => {
        if (res.data.code == 0) {
          this.$refs.t1.open()
          this.handleDetail()
        }
      })
    },
    handleContinue() {
      let formdata = new FormData()
      formdata.append('sn', this.$route.query.sn)
      formdata.append('orderStatus', 'OnDelivery')
      changeStatus(formdata).then(res => {
        if (res.data.code == 0) {
          this.$refs.t2.open()
          this.handleDetail()
        }
      })
    },
    handleStatus() {
      // let nowStatus = this.orderData.orderStatus
      // if (nowStatus == 'HoldDelivery') {
      //   nowStatus == 'OnDelivery'
      // } else if (nowStatus == 'OnDelivery') {
      //   nowStatus == 'HoldDelivery'
      // }
      // console.log(this.orderData.orderStatus);
      // console.log(nowStatus);
      
      // let formdata = new FormData()
      // formdata.append('sn', this.$route.query.sn)
      // formdata.append('orderStatus', nowStatus)
      // changeStatus(formdata).then(res => {
      //   if (this.orderData.orderStatus == 'HoldDelivery') {
      //     this.$refs.t2.open()
      //     this.handleDetail()
      //   } else {
      //     this.$refs.t1.open()
      //     this.handleDetail()
      //   }
      // })
    }
  },
  mounted () {
    handleLogin().then(res => {
      this.handleDetail()
    })
  }
}
</script>
<style lang="less" scoped>
  .page {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .boldFont {
    font-weight: bold;
  }
  .order-clientWrap{
    display: flex;
    flex-direction: column;
    margin: .8rem .6rem;
    font-size: .75rem;
  }
  .order-client__name,
  .order-client__tel,
  .order-client__address,
  .order-client__status {
    display: flex;
    justify-content: space-between;
    padding: .5rem;
    border: 1px solid rgb(226, 226, 226); 
    border-bottom: none;   
  } 
  .order-client__status{
    border-bottom: 1px solid rgb(226, 226, 226); 
  }
  .order-productWrap {
    display: flex;
    flex-direction: column;
    margin: .8rem .6rem 6rem;
    font-size: .75rem;
  }
  .order-product__detail {
    display: flex;
    justify-content: space-between;
  }
  .order-product__img {
    width: auto;
    height: 2rem;
  }
  .order-product__desc {
    margin-left: .2rem;
    overflow: hidden;
    // width: 3rem;
  }
  .order-product__detailWrap,
  .order-product__startData,
  .order-product__deliveryCycle,
  .order-product__deliveryTime {
    display: flex;
    justify-content: space-between;
    padding: .5rem;
    border: 1px solid rgb(226, 226, 226); 
    border-bottom: none;   
  }
  .order-product__detailWrap {
    margin-top: .1rem;
  }
  
  .order-product__deliveryTime {
    border-bottom: 1px solid rgb(226, 226, 226); 
  }
  .order-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    .button {
      border-radius:0;
      font-size: 14px;
      font-weight: bold;
    }
  }

</style>
