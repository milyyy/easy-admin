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
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{$fn.formatTime(scope.row.data)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"></el-button>
            <!-- <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index, scope.row)"></el-button> -->
            <el-button type="danger" icon="el-icon-delete" @click="openDel(scope.$index, scope.row)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
    <Confirm :info="info" @submit="delRow"></Confirm>
  </div>
</template>

<script>
import Dialog from "components/Dialog"
import Confirm from "components/Confirm"
export default {
  name: 'fundlist',
  components: {
    Dialog,
    Confirm
  },
  data() {
    return {
      dialog: {
        show: false,
        title: "添加信息",
        option: 'edit'
      },
      info: {
        show: false,
        title: '提示',
        width: '30%',
        content: "确定删除吗？",
        cancel: "取消",
        submit: "确定",
        id: "" // 便于后续传递
      },
      formData: {
        type: "",
        desc: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
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
      this.dialog = {
        show: true,
        title: "添加信息",
        option: 'add'
      };
      this.formData = {
        type: "",
        desc: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    edit(index, row) {
      this.dialog = {
        show: true,
        title: "编辑信息",
        option: 'edit'
      };
      this.formData = {
        type: row.type,
        desc: row.desc,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    openDel(index, row) {
      this.info.show = true
      this.info.id = row._id;
    },
    delRow(id){
      this.$axios.delete(`/api/profile/delete/${id}`).then(res => {
        if(res.status == 200) {
          this.$message({
            message: "删除成功",
            type:"success"
          })
          this.info.show = false;
          this.getProfile();
        }
      })
    }
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