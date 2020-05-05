import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import router from './router'
import store from './store'
import axios from '@/config/http'
import methods from "utils/commen"

import 'element-ui/lib/theme-chalk/index.css'
import 'assets/style/reset.css'
import 'assets/style/main.css'

Vue.use(ElementUI, {size: 'small'})
Vue.prototype.$axios = axios;
Vue.prototype.$fn = methods;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
