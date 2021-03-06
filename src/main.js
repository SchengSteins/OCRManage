import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock'

Vue.config.productionTip = false
Vue.use(Element)

Vue.prototype.$http = http

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
