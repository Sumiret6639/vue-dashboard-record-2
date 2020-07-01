// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ValidationProvider, extend } from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap'
import 'jquery'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import 'aos/dist/aos.css'


import App from './App'
import router from './router'
import './bus'
import CurrencyFilter from './filters/currency.js'
import { required, email } from 'vee-validate/dist/rules'

library.add(faUserSecret)

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);


import { localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'

localize('zh_TW', TW)

extend('email', email)

extend('required', { // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  ...required,
  message: '{_field_}欄位不可為空白'
})

// Register it globally

axios.defaults.withCredentials = true;

Vue.component('loading', Loading)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.filter('currency', CurrencyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  
  router,
  components: { App },
  template: '<App/>',

  
  render: h => h(App)
})

 // this.$http只能在component下作用

router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next)
  if (to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`  
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success){
        next()
      }else{
        next({
          path: "/login"
        })
      }
    })
    // alert("請先登入帳戶")
  }else{
    next()
  }
})
