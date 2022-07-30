import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'

// import Header from './components/layout/Header'
// import Footer from './components/layout/Footer'

// Vue.component('Header', Header)
// Vue.component('Footer', Footer)
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(VueClipboard)

const axios = require('axios')
// const cors = require('cors')
// const corsOptions = {
//   exposeHeaders: 'Authorization'
// }

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://danyleee.com/api'
// axios.defaults.baseURL = 'http://localhost/api'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
