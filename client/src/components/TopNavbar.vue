<template>
  <div class="header">
    <!-- 顶部导航 -->
    <div class="content">
      <div class="left">
        <img src="../assets/imgs/logo.png" class="logo" alt="logo">
        <span>EATY-ADMIN后台管理系统</span>
      </div>
      <div class="right">
        <el-avatar size="medium" class="avatar" :src="user.avatar"></el-avatar>
        <div class="user">
          <p>{{user.name}}</p>
          <p>welcome</p>
        </div>
        <div class="memu">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    // 这里的user为子模块为user的状态
    // ...mapState(['user'])
    user() {
      return this.$store.state.user.user
    }
  },
  methods: {
    handleCommand(command){
      switch (command) {
        case "info":
          this.getInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    getInfo() { // 个人信息

    },
    logout() {  // 退出
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  background: #8194d8;
  position: fixed;
  left: 0;
  right: 0;
  .content {
    display: flex;
    justify-content: space-between;
    height: 60px;
    overflow: hidden;
    .left {
      line-height: 60px;
      display: flex;
      color: #fff;
      font-weight: 700;
      .logo {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .right {
      display: flex;
      .avatar,
      .user {
        margin-top: 10px;
        margin-right: 10px;
        color: #fff;
        & p:first-child {
          color: #333;
          font-weight: 700;
          text-align: center;
        }
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  line-height: 60px;
  margin-right: 20px;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>