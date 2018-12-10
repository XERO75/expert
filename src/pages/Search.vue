<template>
  <page-content>
    <div class="searchWrap">
      <searchbar v-model="searchContent" @input="input" ></searchbar>
      <div class="search-table">
        <el-table
          :header-cell-style='styleObj'
          row-style="height:50px"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="status"
            border
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            prop="action"
            border
            label="操作"
            width="80">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </page-content>
</template>
<script>
import Content from '../../node_modules/vum/src/components/content'
import Searchbar from '../../node_modules/vum/src/components/searchbar'
export default {
  components: {
    'page-content': Content,
    Searchbar
  },
  data () {
    return {
      searchContent: '2332',
      styleObj: {'background': '#F2F2F2'},
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
.search-table {
  margin:.6rem .4rem 3rem;
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
</style>

