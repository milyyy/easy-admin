<template>
  <div class="layout">
    <TopNavbar></TopNavbar>
    <div class="container">
      <SiderBar></SiderBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNavbar from "components/TopNavbar"
import SiderBar from "components/SiderBar"
export default {
  name: 'layout',
  components: {
    TopNavbar,
    SiderBar
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
    .container {
      display: flex;
      width: 100%;
      min-height: calc(100% - 60px);
    }
  }
</style>
