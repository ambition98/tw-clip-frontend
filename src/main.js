import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'
import ProfileMenu from '@/components/ProfileMenu.vue'
import globalMethod from './globalMethod.js'

// import axios from 'axios'
// import axios from 'axios'
// import AxiosPlugin from 'vue-axios-cors'

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// Vue.use(AxiosPlugin)
// Vue.use(axios)
// const cookieConfig = { path: '/', expires: 'Session', sameSite: 'Strict', secure: 'true', httpOnly: 'true' }
const axios = require('axios')
axios.defaults.baseURL = 'https://danyleee.com/api'
// axios.defaults.baseURL = 'http://localhost/api'
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// const cors = require('cors')
// const corsOptions = {
  //   exposeHeaders: 'Authorization'
  // }
Vue.use(globalMethod)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(VueClipboard)
Vue.use(ProfileMenu)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
