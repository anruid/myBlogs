import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './plugins/vant.js'
import '@vant/touch-emulator'
// 引入全局css样式
import './assets/base.css'
// 去除移动端click点击延迟300s
// import fastclick from 'fastclick'
// 引入es5兼容
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'

import { Message } from 'element-ui'

import vueLazyLoad from 'vue-lazyload'
// fastclick.attach(document.body)
Vue.use(vueLazyLoad, {
  preLoad: 1.3,
  loading: require('./assets/img/loading.gif'),
  attempt: 1
})
axios.defaults.baseURL = 'https://homear.club/'
// axios.defaults.baseURL = 'http://localhost:7777'
// axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(resposne => {
  return resposne
}, err => {
  if (err.response) {
    switch (err.response.status) {
      case 400:
        Message.error('邮箱不存在')
        break
      case 200:
        break
      case 500:
    }
  }
  return Promise.reject(err)
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
