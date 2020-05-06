<template>
  <div class="confirm">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :width="info.width"
    >
      <span>{{info.content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">{{info.cancel}}</el-button>
        <el-button type="primary" @click="$emit('submit', info.id)">{{info.submit}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    info: {
      type: Object
    },
  }
}
</script>
<style lang="scss" scoped>
.confirm /deep/ {
  .el-dialog {
    width: 40%;
    .el-dialog__header {
      padding: 10px 20px 10px;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    .el-dialog__footer {
      padding: 10px 20px;
    }
  }
}
</style>