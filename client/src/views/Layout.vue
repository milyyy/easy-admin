<template>
  <div class="layout">
    <TopNavbar></TopNavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavbar from "components/TopNavbar"
export default {
  name: 'layout',
  components: {
    TopNavbar
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
  }
</style>
