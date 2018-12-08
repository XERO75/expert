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
            <!-- <img src="" class="personal-detail__img"> -->
            <div class="personal-detail__img"></div>
          </div>
          <div class="personal-detail__desc">
            <span>公号: 2312</span>
            <span style="margin: .3rem 0 .2rem; font-weight:bold">李大姐</span>
            <span>12222233464</span>
          </div>
          <el-button type="warning"  @click.native="$refs.p.open()">解绑账号</el-button>
        </div>
      </div>
      <div v-if="type === 2" class="comment">
        <div class="comment-detail">
          <div class="comment-detail__rate">
            评价星级：<i class="iconfont icon-xing1"></i><i class="iconfont icon-xing1"></i><i class="iconfont icon-xing1"></i>
          </div>
          <div class="comment-detail__tag">
            评价标签：<span style="font-weight:normal">{{tag}}</span>
          </div>
          <div class="comment-detail__content">
            评价内容：<span style="font-weight:normal">{{comments}}</span>
          </div>
        </div>
      </div>
    </page-content>
    <pop-window ref="p" class="ppp">
      <div class="content-padded">
        <p style="font-size:.4rem">是否确定解绑该账号？</p>
        <div class="popup-butt">
          <el-button class="aaa" @click.native="$refs.p.close()">确定</el-button>
          <el-button class="aaa" @click.native="$refs.p.close()">取消</el-button>
        </div>
      </div>
    </pop-window>
  </div>
</template>

<script>
import Content from '../../node_modules/vum/src/components/content'
import PopWindow from '../../node_modules/vum/src/components/popwindow'

export default {
  components: {
    'page-content': Content,
    PopWindow
  },
  data () {
    return {
      type: 1,
      tag: 'awesome!!!',
      comments: 'Lorem ipsum dolor sit amet.'
    }
  },
  methods: {
    getPersonal () {
      this.type = 1
    },
    getComment () {
      this.type = 2
    }
  }
}
</script>
<style lang="less">
* {
  font-size: 0.4rem;
}
.personal-list {
  display: flex;
  text-align: center;
  justify-content: space-around;
  // margin-top: .4rem;
  margin: 0.6rem 0;
  font-size: 0.4rem;
}
.personal-list__personal {
  width: 4.5rem;
  height: 1rem;
  line-height: 1rem;
  background: rgb(226, 226, 226);
}

.personal-list__comment {
  width: 4.5rem;
  height: 1rem;
  line-height: 1rem;
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
.el-button--warning {
  color: #fff;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 9rem;
  height: 1.4rem;
  border-radius: 10px;
  position: absolute;
  bottom: 100px;
}
.ppp {
  .popwindow-modal {
    height: 21% !important;
  }
}
.content-padded {
  p {
    text-align: center;
  }
  .aaa {
    height: 1.2rem;
    width: 3.4rem;
  }
  .popup-butt {
    margin-top: 0.8rem;
    display: flex;
  }
}
.comment-detail {
  margin: 1rem .4rem;
  font-size: .4rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-bottom: .2rem;
}
.comment-detail__rate,
.comment-detail__tag,
.comment-detail__content {
  margin: .2rem 0;
  // font-size: .4rem;
  font-weight: bold;
}
.comment {
  .iconfont {
    font-size: .5rem;
    color: #F4EA29;
  }
}
</style>

