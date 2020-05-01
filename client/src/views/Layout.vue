<template>
  <div class="layout">
    <TopNavbar></TopNavbar>
    <div class="container">
      <SliderBar></SliderBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNavbar from "components/TopNavbar"
import SliderBar from "components/SliderBar"
export default {
  name: 'layout',
  components: {
    TopNavbar,
    SliderBar
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
