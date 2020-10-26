import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueIziToast from 'vue-izitoast'

import 'izitoast/dist/css/iziToast.css'

Vue.config.productionTip = false

// import fonts for use
// import './fonts/AirbnbCerealBlack.ttf';
// import './fonts/AirbnbCerealBold.ttf';
// import './fonts/AirbnbCerealBook.ttf';
// import './fonts/AirbnbCerealExtraBold.ttf';
// import './fonts/AirbnbCerealLight.ttf';
// import './fonts/AirbnbCerealMedium.ttf';

import Axios from 'axios'
Axios.defaults.baseURL = "http://192.168.43.162:5000/"
// Axios.defaults.baseURL = "https://ahiajara.herokuapp.com/"

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token'); 
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VueIziToast);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
