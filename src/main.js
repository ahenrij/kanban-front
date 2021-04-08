import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import ApiService from './services/api.service'
import TokenService from './services/storage.service'

Vue.use(Notifications)
Vue.config.productionTip = false

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API, store)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
  ApiService.mount401Interceptor()
}

import './assets/css/style.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
