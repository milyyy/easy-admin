<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >

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
      formData: {}
    }
  }
}
</script>