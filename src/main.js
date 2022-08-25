import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
// import VueClipboard from 'vue-clipboard2'
import ProfileMenu from '@/components/ProfileMenu.vue'
import globalMethod from './globalMethod.js'

const axios = require('axios')
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost/api'
// axios.defaults.baseURL = 'https://danyleee.com/api'

Vue.use(globalMethod)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(ProfileMenu)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
