<template>
<div class="search-page">
  <page-content>
    <div class="searchWrap">
      <form action="/">
        <searchbar v-model="searchKey" @submit.native.prevent @input="search" ></searchbar>
      </form>
      <div class="search-table">
        <el-table
          :header-cell-style='styleObj'
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="地址">
            <template slot-scope="scope">
              <span>{{scope.row.memberDistrict}}{{scope.row.gaodeAddress}}{{scope.row.memberAddress}}{{scope.row.memberRoom}}</span>
            </template> 
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.orderStatus == 'Collaging'" style="color: green; font-size:12px">拼团中</span>
                <span v-if="scope.row.orderStatus == 'OnDelivery'" style="color: green; font-size:12px">正常派送</span>
                <span v-if="scope.row.orderStatus == 'HoldDelivery'" style="color: red; font-size:12px" >暂停派送</span>
                <span v-if="scope.row.orderStatus == 'UnSettle'" style="color: red; font-size:12px" >未分配</span>
                <span v-if="scope.row.orderStatus == 'UnDeal'" style="color: red; font-size:12px" >未处理</span>
                <span v-if="scope.row.orderStatus == 'Refuse'" style="color: red; font-size:12px" >已拒绝</span>
                <span v-if="scope.row.orderStatus == 'completed'" style="color: green; font-size:12px">已完成</span>
                <span v-if="scope.row.orderStatus == 'cancelled'" style="color: red; font-size:12px" >已取消</span>
                <span v-if="scope.row.orderStatus == 'Finish'" style="color: green; font-size:12px">已评价</span>
                <span v-if="scope.row.orderStatus == 'Closed'" style="color: red; font-size:12px" >已关闭</span>
              </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="80">
              <template slot-scope="scope">
                <span @click="handleCheck(scope.row.sn)" style="color: green; font-size:12px"><i style="font-size:14px" class="iconfont icon-065chakandingdan"></i>查看</span>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <p v-if="tableData !== null" class="search-button"><a @click="next" >点击加载</a></p>
  </page-content>
  <toast text="暂无数据" type="error" ref="t2"></toast>
</div>
</template>
<script>
import Vue from 'vue'
import Content from '../../node_modules/vum/src/components/content'
import Searchbar from '../../node_modules/vum/src/components/searchbar'
import Toast from '../../node_modules/vum/src/components/toast'
import { handleLogin } from "../assets/api/login.js";
import { getSearch } from '../assets/api/search.js'
import _ from 'lodash'; //引入lodash
import axios from 'axios' //引入axios

//请求canceltoken列表
let sources = [];
export default {
  components: {
    'page-content': Content,
    Searchbar,
    Toast,
  },
  data () {
    return {
      searchKey: '',
      styleObj: {'background': '#F2F2F2'},
      pageNumber: 1,
      pageTotal: 1,
      tableData: []
    }
  },
  methods: {
    //准备搜索
    search: _.debounce(
      function () {
        let that = this
        // let api = ''
        // let api1 = '/app/service_department/search.htm'
        // let api2 = 'api/app/service_department/search.htm'
        _.remove(sources, function (n) {
          return n.source === null;
        });
        sources.forEach(function (item) {
          if (item !== null && item.source !== null && item.status === 1) {
            item.status = 0;
            item.source.cancel('取消上一个')
          }
        });
        var sc = {
          source: axios.CancelToken.source(),
          status: 1 //状态1：请求中，0:取消中
        };
        sources.push(sc);
        // this.searchKey == '' ? api=api2 : api = api1
        axios.get('/api/app/express_server/search.htm', {
          cancelToken: sc.source.token,
          params: {
            keyword: this.searchKey,
            WX_TYPE: 'OfficialAccount'
          }
        }).then(function (res) {
          //请求成功
          sc.source = null; //置空请求canceltoken
          console.log('搜索成功');
          console.log('返回的值是',res.data);
          if( res.data.data != null ){
            that.tableData = res.data.data.content
            that.pageNumber = res.data.data.pageNumber
            that.pageTotal = res.data.data.totalPage
            // that.listData = res.data.data
            console.log('成功赋值啦');
          } else {
            that.tableData = null
            console.log('无数据');
          }
        }).catch(() => { 
          console.log('请求失败');
          that.tableData = null
          sc.source = null; //置空请求canceltoken
        })
      },
      500 //空闲时间间隔设置500ms
    ),
    handleCheck(sn) {
      this.$router.push({path:'/orderDetail',query:{sn}})
    },
    next() {
      if (this.searchKey == '' && this.pageNumber < this.pageTotal) {
        this.pageNumber ++
        getSearch(this.pageNumber).then(res => {
          if (res.data.data !== null) {
            this.tableData = this.tableData.concat(res.data.data.content)
            console.log(this.pageNumber,this.pageTotal);
          } else {
            this.$refs.t2.open()
          }
        })
      } else if(this.pageNumber < this.pageTotal) {
        this.pageNumber ++
        getSearch(this.pageNumber, this.searchKey).then(res => {
          console.log(res);
          if (res.data.data !== null) {
            this.tableData = this.tableData.concat(res.data.data.content)
          } else {
            this.$refs.t2.open()
          }
        })
      } else {
        this.$refs.t2.open()
      }
    },
  },
  mounted() {
    handleLogin().then((res) => {
      getSearch().then((res) => {
        this.tableData = res.data.data.content
        this.pageNumber = res.data.data.pageNumber
        this.pageTotal = res.data.data.totalPage
      });
    })
  },
}
</script>
<style lang="less">
.search-table {
  margin:.6rem .4rem .5rem;
  font-size: 12px;
}
.search-searchBar {
  margin: .3rem .4rem;
  color: rgb(200, 200, 200);
  .el-input__inner {
    font-size: .4rem;
    padding: .5rem .2rem;
    border: 2px solid rgb(200, 200, 200);
    border-radius: 10px;
  }
}
.search-button {
  text-align: center;
  margin-bottom: 4rem;
  a {
    text-decoration:none;
    color:rgb(122, 121, 121); 
  }
}
</style>

