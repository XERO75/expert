<template>
  <div class="page">
    <page-content >
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.2rem; font-size:.7rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{name}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{tel}}</span>
        </div>
        <div class="order-client__address">
          <span class="boldFont">地址</span>
          <span>{{address}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{status}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; margin-bottom:.2rem; font-size:.7rem">产品</span>
        <div class="order-product__detailWrap">
          <div class="order-product__detail">
            <img class="order-product__img" src="../assets/img/index/milk.png" alt="">
            <span class="order-product__desc">{{productDescription}}</span>
          </div>
          <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{startData}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{deliveryCycle}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{deliveryTime}}</span>
        </div>
      </div>
      <div class="order-footer">
        <!-- <el-button type="success">暂停送奶</el-button> -->
        <m-button size="large" >暂停送奶</m-button>
      </div>
    </page-content>
  </div>
</template>

<script>
import { Footer } from '../../node_modules/vum/src/components/footer'
import Content from '../../node_modules/vum/src/components/content'
import Icon from '../../node_modules/vum/src/components/icons'
import { Button } from '../../node_modules/vum/src/components/buttons'

export default {
  components: {
    'page-content': Content,
    // 'btn': Button,
    Icon,
    'm-button': Button,
    'page-footer': Footer
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
      productDescription: '谷元黑米牛奶饮品236ml'
    }
  }
}
</script>
<style lang="less" scoped>
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
    margin: .8rem .6rem;
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
