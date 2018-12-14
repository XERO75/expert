<template>
  <page-content>
    <div class="statitics">
      <div class="statitics-list">
        <div :class="{'statitics-list__active': status == 'Morning'}" @click="getMorning()" class="statitics-list__morning">
          <i class="iconfont icon-shangwu2"></i>
          今日上午
        </div>
        <div :class="{'statitics-list__active': status == 'Afternoon'}" @click="getAfternoon()" class="statitics-list__afternoon">
          <i class="iconfont icon-xiawu"></i>
          今日下午
        </div>
      </div>
      <div class="statistics-table">
        <el-table
          :header-cell-style='styleObj'
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="配送产品">
            <template slot-scope="scope">
              <div class="statitics-tableWrap">
                <img :src="scope.row.image" class="statitics-table__pic" alt="">
                <span>{{scope.row.name}}{{scope.row.specifications}}</span>
              </div>
            </template> 
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            align='center'
            width="80">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import { handleLogin } from '../assets/api/login.js'
import { getStatistics } from '../assets/api/statistics.js'
export default {
  components: {
    'page-content': Content
  },
  data () {
    return {
      status: 'Morning',
      styleObj: {'background': '#F2F2F2'},
      tableData: []
    }
  },
  methods: {
    getMorning () {
      this.status = 'Morning'
      getStatistics(this.status).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
        } else this.tableData = null 
      })
    },
    getAfternoon () {
      this.status = 'Afternoon'
      getStatistics(this.status).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
        } else this.tableData = null 
      })
    }
  },
  mounted() {
    handleLogin().then(res => {
      this.getMorning()
    })
  },
}
</script>
<style lang="less" scoped>
  .statitics-list {
    .iconfont {
      font-size: .6rem;
    }
  }
  // * {
  //   font-size: .4rem;
  // }
  
  .statistics-table {
    margin:.6rem .6rem 5rem;
    font-size: 12px;
  }
  .el-table .title-color {
    background: oldlace;
  }
  .iconfont {
    font-size: .4rem;
  }
  .statitics-list {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin: .8rem 0;
    font-size: .4rem;
  }
  .statitics-list__morning {
    width: 7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: rgb(226, 226, 226);
  }
  
  .statitics-list__afternoon {
    width: 7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: rgb(226, 226, 226);
  }
  
  .statitics-list__active {
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  .statitics-tableWrap {
    display: flex;
    // justify-content: center;
    align-items: center;
  }
  .statitics-table__pic {
    width: 2.5rem;
    margin-right: .2rem;
  }
</style>

