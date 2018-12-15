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
    <!-- <toast text="已暂停" ref="t1"></toast> -->
    <!-- <toast text="确认继续" ref="t2"></toast> -->
    <van-dialog
      v-model="showPop"
      show-cancel-button
      :before-close="beforeClose"
    >
      <h1 class="pop_header">确定是否暂停订单？</h1>
      <p class='pop_subHeader'>订单预计启动日期</p>
      <input class='pop_time' @click="handlePickDate" type="text" readonly="readonly" v-model="rebeginDate">
    </van-dialog>

    <van-popup v-model="bottomShow" position="bottom" :overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="onCancel"
        @confirm="confirmOne"
      />
    </van-popup>
    

  </div>
</template>

<script>
import Vue from 'vue'
import { Footer } from '../../node_modules/vum/src/components/footer'
import Content from '../../node_modules/vum/src/components/content'
import Icon from '../../node_modules/vum/src/components/icons'
import { Button } from '../../node_modules/vum/src/components/buttons'
import { handleLogin } from '../assets/api/login.js'
import { getDetails, changeStatus } from '../assets/api/OrderDetail.js'
// import Toast from '../../node_modules/vum/src/components/toast'
import { Dialog } from 'vant';
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Dialog);
export default {
  components: {
    'page-content': Content,
    // 'btn': Button,
    Icon,
    'm-button': Button,
    'page-footer': Footer,
    // Toast
  },
  data () {
    return {
      orderData: {},
      showPop: false,
      currentDate: new Date(new Date().setDate(new Date().getDate()+1)),
      bottomShow: false,
      rebeginDate: this.dateLong2String(new Date(new Date().setDate(new Date().getDate()+1))),
      minDate: new Date(new Date().setDate(new Date().getDate()+1)),
    }
  },
  computed() {

  },
  methods: {
    handleDetail() {
      getDetails(this.$route.query.sn).then(res => {
        this.orderData = res.data.data
      })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(() => {
          let formdata = new FormData()
          formdata.append('sn', this.$route.query.sn)
          formdata.append('orderStatus', 'HoldDelivery')
          formdata.append('rebeginDate', this.dateLong2String(this.rebeginDate))
          changeStatus(formdata).then(res => {
            if (res.data.code == 0) {
              Toast.success({message:'已暂停', duration:1000});
              this.handleDetail()
              done()
            }
          })
        }, 1000);
        // setTimeout(done, 1000);
      } else {
        done();
      }
    },
    handlePickDate() {
      this.bottomShow = true
    },
    dateLong2String(time){
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      month = month < 10 ? "0"+month:month;
      day = day < 10 ? "0"+day:day;
      return year+"-"+month+"-"+day;
    },
    onCancel() {
      this.bottomShow = false
    },
    confirmOne(picker, value, index) {
      this.rebeginDate = this.dateLong2String(picker)
      this.bottomShow = false
    },
    handleStop() {
      this.showPop = true
      // let formdata = new FormData()
      // formdata.append('sn', this.$route.query.sn)
      // formdata.append('orderStatus', 'HoldDelivery')
      // formdata.append('rebeginDate', this.rebeginDate)
      // changeStatus(formdata).then(res => {
      //   if (res.data.code == 0) {
      //     this.$refs.t1.open()
      //     this.handleDetail()
      //   } else {

      //   }
      // })
    },
    handleContinue() {
      let formdata = new FormData()
      formdata.append('sn', this.$route.query.sn)
      formdata.append('orderStatus', 'OnDelivery')
      changeStatus(formdata).then(res => {
        if (res.data.code == 0) {
          // this.$refs.t2.open()
          Toast.success({message:'确认继续', duration:1000});
          this.handleDetail()
        }
      })
    }
  },
  mounted () {
    // handleLogin().then(res => {
      this.handleDetail()
    // })
  }
}
</script>
<style lang="less">
  .page {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .van-dialog__confirm,
    .van-picker__cancel,
    .van-picker__confirm{
      color: #04BE02;
    }
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
  .pop_header {
    font-size: 14px;
    text-align: center;
    font-weight: normal;
    margin: .8rem 0 1rem;
  }
  .pop_subHeader {
    margin: 1rem 1rem .2rem 1rem;
    font-weight: normal;
    color: 	#808080
  }
  .pop_time {
    border: 1px solid #f6f6f6;
    padding: 5px;
    width: 12rem;
    margin: .5rem auto 1rem;
    display: block;
    // margin-left: 1rem;
    text-align: center;
  }

</style>
