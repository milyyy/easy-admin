<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form :model="formData" :rules="formRule" ref="dialogForm" labelWidth="80px" status-icon>
          <el-form-item label="收支类型" prop="type">
            <el-select v-model="formData.type">
              <el-option v-for="item in type_list" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formData.desc"></el-input>
          </el-form-item>
          <el-form-item label="收入" prop="income">
            <el-input v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item label="花费" prop="expend">
            <el-input v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item label="现金" prop="cash">
            <el-input v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dialogForm')">提交</el-button>
            <el-button @click="dialog.show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object
    }
  },
  data(){
    return {
      formData: {
        type: "",
        desc: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      type_list: ['日用', '娱乐', '运动'],
      formRule: {
        type: [
          {required:true, message: '请选择收支类型', trigger: 'blur'}
        ],
        income: [
          {required:true, message: '收入不能为空', trigger: 'blur'}
        ],
        expend: [
          {required:true, message: '支出不能为空', trigger: 'blur'}
        ],
        cash: [
          {required:true, message: '现金不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.$axios.post("/api/profile/add", this.formData).then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            })
            this.dialog.show = false;
            this.$emit('update');
          })
        } else {
          console.log('err submit');
          return false;
        }
      })
      
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog /deep/ .el-dialog {
  width: 40%;
}
  
</style>