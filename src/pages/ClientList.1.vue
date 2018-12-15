<template>
  <page-content>
    <div class="client" v-for="item in orderLists" :key="item.index">
      <div class="client-detail__name">
        <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{item.memberName}}</p>
        <a style=" color:#54A93E;" :to="{ path: 'billDetail' }">详情</a>
      </div>
      <div class="client-detail__tel">
        <p><span class="fontBold">电话:&nbsp;&nbsp;</span>{{item.memberPhone}}</p>
      </div>
      <div class="client-product__detailWrap" v-for="n in item.orderItems" :key="n.index">
        <div class="client-product__detail">
          <img class="client-product__img" src="../assets/img/index/milk.png" alt="">
          <span class="client-product__desc">{{n.productName}}{{n.specifications}}</span>
        </div>
        <span>共{{n.totalCount}}/剩{{n.remain}}/日送{{n.number}}</span>
      </div>
      <div class="client-detail__address">
        <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{item.memberDistrict}}{{item.gaodeAddress}}{{item.memberAddress}}</p>
      </div>
    </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import { handleLogin } from "../assets/api/login.js";
import { getOrder } from '../assets/api/clientList.js'
export default {
  components: {
    'page-content': Content
  },
  data () {
    return {
      name: 'lorem',
      tel: 123132121,
      address: 'Lorem ipsum dolor sit.',
      productDescription: 'Lorem ipsum dolor sit.',
      total: 100,
      left: 11,
      daily: 89,

      id: '',
      opr:'first',
      orderLists: [],
      // productLists: []
    }
  },
  mounted () {
    // handleLogin().then(res => {
      getOrder(this.opr, this.id).then(res => {
        console.log(res);
        this.orderLists = res.data.data.content
      })
    // })
  }
}
</script>
<style lang="less" scoped>
  .client {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    height: 8rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid  rgb(200, 200, 200);
  }
  .client-detail__name,
  .client-detail__tel,
  .client-product__detailWrap,
  .client-detail__address {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    width: 4rem;
  }
</style>
