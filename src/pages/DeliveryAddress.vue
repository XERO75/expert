<template>
  <page-content>
    <div class="deliveryAddress">
      <div class="deliveryAddress-list">
        <div :class="{'deliveryAddress-list__active': type == 1}" class="deliveryAddress-list__morning">今日上午</div>
        <div :class="{'deliveryAddress-list__active': type == 2}" class="deliveryAddress-afternoon">今日下午</div>
      </div>
    </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
export default {
  components: {
    'page-content': Content
  }
}
</script>
<style lang="less" scoped>
.deliveryAddress-list {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-top: .8rem;
    font-size: .4rem;
  }
</style>

