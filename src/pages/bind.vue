<template>
  <div class="signUp">
    <div class="signUp-detail">
      <div class="signUp-detail__avatarWrap">
        <img src="" alt="" class="signUp-detail__avatar">
      </div>
      <div class="signUp-detail__courier">绑定优鲜达人李大妈</div>
      <div class="signUp-detail__tel">手机号码 : 222222112121</div>
      <m-button @click.native="$refs.confirm.open()" class="signUp-detail__button">立即绑定</m-button>
    </div>
    <confirm :title="'Hello'" :content="'Hello there!'" :on-ok="log" ref="confirm"></confirm>
  </div>
</template>
<script>
import { Button } from '../../node_modules/vum/src/components/buttons'
import { Confirm } from '../../node_modules/vum/src/components/modal'


  export default {
    components: {
      'm-button': Button,
      Confirm
    },
    data() {
      return {

      }
    },
    methods: {
      log (m) {
        console.log(m || 'log')
      }
      // handleBind() {
      //   comfirmBind(this.$route.query.departmentId).then(res => {
      //     if (res.data.code == 0) {
      //       Toast.success('绑定成功');
      //       this.$router.push({path:'/'})
      //     }else {
      //       Toast.fail(res.data.errmsg);
      //     }
      //   }).catch(() => {
      //     Toast.fail('请求失败');
      //   })
      // }
    },
    mounted () {
      // handleLogin().then(res => {
      //   this.departmentId = this.$route.query.departmentId
      //   getDetails(this.departmentId).then(res => {
      //     console.log(res);
      //     this.department = res.data.name
      //     this.address = res.data.address
      //     this.contact = res.data.contact
      //     this.contactWay1 = res.data.contactWay1
      //     this.contactWay2 = res.data.contactWay2
      //   })
      // })
    }
  }
</script>
<style lang="less">
  .signUp-detail {
    display: flex;
    height: 100%;
    margin: 10px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .signUp-detail__avatarWrap { 
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin: .5rem 0 1rem;
    overflow: hidden;
    background: url(../assets/img/avatar.png) center no-repeat;
    background-size: 5rem 5rem;
  }
  .signUp-detail__avata {
    width: 100%;
  }
  .signUp-detail__courier { 
    font-size: 18px;
  }
  .signUp-detail__tel {
    font-size: 13px;
    color: rgb(183, 183, 183);
    margin: .2rem 0 1.2rem;
  }
  .signUp-detail__button {
    width: 98%;
    font-size: 14px;
    // border-radius: 5px;
    background: rgb(25, 173, 25);
    color: rgb(251, 251, 251);
  }
 
</style>
