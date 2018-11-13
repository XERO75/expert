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
      <div class="statistics-table" style="margin:0 .2rem; fontSize=.4rem">
        <el-table
          :header-cell-style="{background:'#F2F2F2'}"
          row-style="height:50px"
          :data="tableData"
          :Table="medium"
          :border="true"
          style="width: 100%; font-size: 10px">
          <el-table-column
            prop="date"
            border
            label="日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            border
            label="姓名"
            width="160">
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
    width: 4.5rem;
    height: 1rem;
    line-height: 1rem;
    background: rgb(226, 226, 226);
  }
  
  .statitics-list__afternoon {
    width: 4.5rem;
    height: 1rem;
    line-height: 1rem;
    background: rgb(226, 226, 226);
  }
  
  .statitics-list__active {
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
</style>

