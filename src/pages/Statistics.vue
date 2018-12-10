<template>
  <page-content>
    <div class="statitics">
      <div class="statitics-list">
        <div :class="{'statitics-list__active': type == 1}" @click="getMorning()" class="statitics-list__morning">
          <i class="iconfont icon-shangwu2"></i>
          今日上午
        </div>
        <div :class="{'statitics-list__active': type == 2}" @click="getAfternoon()" class="statitics-list__afternoon">
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
            prop="date"
            border
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            border
            label="姓名"
            width="80">
          </el-table-column>
        </el-table>
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
      type: 1,
      styleObj: {'background': '#F2F2F2'},
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        }
      ]
    }
  },
  methods: {
    getMorning () {
      this.type = 1
    },
    getAfternoon () {
      this.type = 2
    }
  }
}
</script>
<style lang="less" scoped>
  // * {
  //   font-size: .4rem;
  // }
  .statistics-table {
    margin:.6rem .6rem 3rem;
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
    // margin-top: .4rem;
    margin: .6rem 0;
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
</style>

