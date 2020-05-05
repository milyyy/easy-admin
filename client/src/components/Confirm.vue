<template>
  <div class="confirm">
    <el-dialog title="提示" :visible.sync="info.visible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    info: {
      type: Object,
      default: {
        visible: false,
        title: '',
        width: '30%',
        content: "",
        cancel: "取消",
        submit: "确定"
      }
    },
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>