<template>
  <div class="foundlist">

    <el-form :inline="true" ref="form">
      <el-form-item class="right">
        <el-button type="primary" @click="add()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column label="收入">
        <template slot-scope="scope">
          <span style="color:#67C23A">{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出">
        <template slot-scope="scope">
          <span style="color:#F56C6C">{{scope.row.expend}}</span>
        </template>
      </el-table-column>
      <el-table-column label="现金">
        <template slot-scope="scope">
          <span style="color:#409EFF">{{scope.row.cash}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="data" label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index, scope.row)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <Dialog :dialog="dialog"></Dialog>
  </div>
</template>

<script>
import Dialog from "components/Dialog"
export default {
  name: 'fundlist',
  components: {
    Dialog
  },
  data() {
    return {
      dialog: {
        show: false,
        title: "添加信息"
      },
      tableData: []
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$axios.get('/api/profile').then(res => {
        this.tableData = res.data
        // console.log(this.tableData);
      })
    },
    add() {
      this.dialog.show = true
    },
    del() {},
    edit() {}
  },
}
</script>

<style lang="scss" scoped>
.foundlist {
  width: 100%;
  /deep/ thead .cell {
    font-weight: bold;
  }
}  
</style>