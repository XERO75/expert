<template>
  <page-content>
    <div class="client">
      <div class="client-detail__name">
        <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{name}}</p>
        <router-link style="align-self:center; color:#54A93E;" :to="{ path: 'billDetail' }">
          详情
        </router-link>
      </div>
      <div class="client-detail__tel">
        <p><span class="fontBold">电话:&nbsp;&nbsp;</span>{{tel}}</p>
      </div>
      <div class="client-product__detailWrap">
        <div class="client-product__detail">
          <img class="client-product__img" src="../assets/img/index/milk.png" alt="">
          <span class="client-product__desc">{{productDescription}}</span>
        </div>
        <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
      </div>
      <div class="client-detail__address">
        <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{address}}</p>
      </div>
    </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
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
      daily: 89
    }
  }
}
</script>
<style lang="less" scoped>
  * {
    font-size: 0.4rem;
  }
  .client {
    display: flex;
    flex-direction: column;
    margin: .6rem .4rem;
    font-size: .75rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid  rgb(200, 200, 200);
  }
  .client-detail__name,
  .client-detail__tel,
  .client-product__detailWrap,
  .client-detail__address {
    display: flex;
    justify-content: space-between;
    // padding: .2rem;
    height: .8rem;
  }
  .client-product__detailWrap {
    margin: .5rem 0;
    // height: 4rem;
    // margin-top: .5rem;
  }
  .client-product__detail {
    display: flex;
    justify-content: space-between;
  }
  .client-product__img {
    width: auto;
    height: 1.5rem;
  }
  .client-product__desc {
    display: inline-block;
    margin-left: .3rem;
    overflow: hidden;
    width: 3rem;
    height: 1.5rem;
  }
</style>
