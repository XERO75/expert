<template>
  <page-content>
    <div class="searchWrap">
      <div class="search-searchBar">
        <el-input
          placeholder="输入手机号码、姓名、地址搜索订单"
          v-model="searchContent"
          clearable>
        </el-input>
      </div>
      <div class="search-table" style="margin:0 .2rem; fontSize=.4rem">
        <el-table
          :header-cell-style="{background:'#F2F2F2'}"
          row-style="height:50px"
          :data="tableData"
          :Table="medium"
          :border="true"
          style="width: 100%; font-size: 10px">
          <el-table-column
            prop="address"
            label="地址"
            width="140">
          </el-table-column>
          <el-table-column
            prop="status"
            border
            label="状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="action"
            border
            label="操作"
            width="110">
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
      searchContent: '2332',
      tableData: [
        {
          address: 'Lorem, ipsum dolor.',
          status: '王小虎',
          action: '查看'
        },
        {
          address: 'Lorem ipsum dolor sit.',
          status: '王小虎',
          action: '查看'
        }
      ]
    }
  }
}
</script>
<style lang="less">
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
</style>

