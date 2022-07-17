import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const axios = require('axios')
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://danyleee.com'
// axios.defaults.baseURL = 'http://localhost'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
