<template>
  <div class="layout">
    <TopNavbar></TopNavbar>
    <div class="container">
      <SiderBar></SiderBar>
      <div class="view">
        <router-view></router-view>
      </div>
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
    overflow: hidden;
    .container {
      display: flex;
      width: 100%;
      min-height: calc(100% - 60px);
      .view {
        // flex: 1;
        // width: 100%;
        width: calc(100% - 240px);
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
