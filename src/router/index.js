import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

  // Символ @ говорит, что нужно смотреть именно из корня нашего приложения (т.е. из корня папки src)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',   // Параметр пути
      name: 'home',   // Параметр имени
      component: Home   // Параметр компонента
    },
    {
      path: '/ad/:id',
      props: true,  // Передача id, как параметр в компонент
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard  // Защита роута
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'   // Избавляемся от хэша в адресной строке (по-умолчанию способа маршрутизации во Vue приложении)
})
