<template>
  <div class="profile">
    <h3>个人信息</h3>
    <div>
      <p>
        <el-avatar size="large" class="avatar" :src="user.avatar"></el-avatar>
      </p>
      <p>
        {{user.name}}
      </p>
    </div>
    
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },  
}
</script>

<style lang="scss" scoped>
  .profile {
    padding: 50px;
    text-align: center;
    h3 {
      margin-bottom: 50px;
    }
  }
</style>
