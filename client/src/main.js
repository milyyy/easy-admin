import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import router from './router'
import store from './store'

// import '@/utils/ele_config'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/style/reset.css'
import 'assets/style/main.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
