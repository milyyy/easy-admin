<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    // 页面刷新前把state存储到sessionStorage中，原因参考https://juejin.im/post/5c809599f265da2dbe030ec6
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
    // 在页面加载时读取sessionStorage里的状态信息
    if(sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign(
        {}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))
      ))
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}

</style>
