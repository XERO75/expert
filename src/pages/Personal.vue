<template>
  <div class="page">
    <page-content>
      <div class="personal-list">
        <div :class="{'personal-list__active': type == 1}" @click="getPersonal()" class="personal-list__personal">
          个人资料
        </div>
        <div :class="{'personal-list__active': type == 2}" @click="getComment()" class="personal-list__comment">
          收到评价
        </div>
      </div>
      <div v-if="type === 1" class="personal">
        <div class="personal-detail">
          <div class="personal-detailWrap">
            <img :src="courier.image" alt="" class="personal-detail__avatar">
          </div>
          <div class="personal-detail__desc">
            <span style="color:rgb(102, 102, 102)">工号: {{courier.code}}</span>
            <span style="margin: .5rem 0 .2rem; font-weight:bold">{{courier.name}}</span>
            <span>{{courier.phone}}</span>
          </div>
          <m-button @click.native="$refs.modal.open()" type="warning" class="personal-detail__button">解绑账号</m-button>
        </div>
      </div>
      <div v-if="type === 2" class="comment">
        <div class="comment-detail" v-for="item in comments" :key="item.index">
          <div class="comment-detail__rate">
            评价星级：<i v-for="n in Number(item.stars)"
                    :key="n.id"
                    class="iconfont icon-xing1"
                    style="color:#f47565"></i>
          </div>
          <div class="comment-detail__tag">
            评价标签：<span style="font-weight:normal">{{item.tag.split('#').reverse().join(' ')}}</span>
          </div>
          <div class="comment-detail__content">
            评价内容：<span style="font-weight:normal">{{item.otherComment}}</span>
          </div>
        </div>
      </div>
    </page-content>
    <modal ref="modal">
      <div slot="title">是否解绑该账号</div>
      <!-- <div slot="content">Choose your payment!</div> -->
      <div slot="buttons" class="modal-buttons">
        <span class="modal-button comfirm" @click="handleComfirm" style="font-size:12px;">确定</span>
        <span class="modal-button modal-button-cancel" @click="$refs.modal.close()" style="font-size:12px">取消</span>
      </div>
    </modal>
    <toast text="解绑成功" ref="t1"></toast>
  </div>
</template>

<script>
import Content from '../../node_modules/vum/src/components/content'
import { Button } from '../../node_modules/vum/src/components/buttons'
import PopWindow from '../../node_modules/vum/src/components/popwindow'
import { Modal } from '../../node_modules/vum/src/components/modal'
import { handleLogin } from '../assets/api/login.js'
import { getPerson, unBindHandler, getComment } from '../assets/api/personal.js'
import Toast from '../../node_modules/vum/src/components/toast'



export default {
  components: {
    'page-content': Content,
    'm-button': Button,
    PopWindow,
    Modal,
    Toast
  },
  data () {
    return {
      type: 1,
      tag: 'awesome!!!',
      comment: 'Lorem ipsum dolor sit amet.',

      courier: {},
      comments: []
    }
  },
  methods: {
    getPersonal () {
      this.type = 1
      getPerson().then(res => {
        console.log(res);
        this.courier = res.data.data
      })
    },
    getComment () {
      this.type = 2
      getComment().then(res => {
        console.log(res);
        this.comments = res.data.data.content
      })
    },
    handleComfirm() {
      unBindHandler().then(res => {
        if(res.data.code == 0){
          this.$refs.t1.open()
          this.$refs.modal.close()
          setTimeout(() => {
            this.$router.push({path:'/bind', query:{expressId:this.courier.id}})
          }, 1000);
        }
      })
    }
  },
  mounted() {
    handleLogin().then(res => {
      this.getPersonal()
    })
  },
}
</script>
<style lang="less">
// * {
//   font-size: 0.4rem;
// }
.personal-list {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin: .8rem 0;
  font-size: .4rem;
}
.personal-list__personal {
  width: 7rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: rgb(226, 226, 226);
}

.personal-list__comment {
  width: 7rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: rgb(226, 226, 226);
}

.personal-list__active {
  color: white;
  font-weight: bold;
  background: #54a93e;
}

.personal-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  .button {
    margin-top: 4rem;
    font-size: 14px;
  }
}
.personal-detailWrap {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin: .5rem 0 .3.2rem;
  overflow: hidden;
  background: url(../assets/img/avatar.png) center no-repeat;
  background-size: 3.2rem 3.2rem;
}
.personal-detail__avatar {
  width: 100%;
}
.personal-detail__img {
  width: 2rem;
  height: 2rem;
  background: rgb(199, 199, 199);
  border-radius: 50%;
  margin-bottom: 0.2rem;
}
.personal-detail__desc {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personal-detail__button {
  width: 90%;
  // font-size: 14px;
}
.comment-detail {
  margin: 1rem .8rem;
  font-size: .4rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-bottom: .2rem;
}
.comment-detail__rate,
.comment-detail__tag,
.comment-detail__content {
  margin: .4rem 0;
  font-weight: bold;
  color: rgb(102, 102, 102)
}
.comment {
  .iconfont {
    font-size: 1rem;
    color: #F4EA29;
  }
}
.modal-buttons {
  .comfirm {
     background: rgb(255, 102, 0);
     color:#eee;
  }
}
</style>

