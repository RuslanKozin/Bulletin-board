// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'  // импортировать все, как переменную fb из библиотеки firebase
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',   // template рендерит components: { App }
  created () {  // created - жизненный цикл для инициализации компонента
    fb.initializeApp({
      apiKey: 'AIzaSyD5mgcTCPSiTxPfmTmBmPFWZU7GdR9l1BQ',
      authDomain: 'itc-ads.firebaseapp.com',
      databaseURL: 'https://itc-ads.firebaseio.com',
      projectId: 'itc-ads',
      storageBucket: 'itc-ads.appspot.com',
      messagingSenderId: '145551978680'
    })
  }
})
