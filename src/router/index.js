import Vue from 'vue'
import Router from 'vue-router'
import Vuemeta from 'vue-meta'
import VueSession from 'vue-session'
import VueFire from 'vuefire'
import VueStash from 'vue-stash'

Vue.use(VueSession)
Vue.use(Vuemeta)
Vue.use(VueFire)
Vue.use(VueStash)

import Homepage from '@/pages/Homepage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Cart from '@/pages/Cart'
import Category from '@/pages/Category'
import Contact from '@/pages/Contact'
import Viewproduct from '@/pages/Viewproduct'
import Reload from '@/pages/reload'
import Viewwebboard from '@/pages/Viewwebboard'
import Webboard from '@/pages/Webboard'
import Checkout from '@/pages/Checkout'
import User from '@/pages/User'
import Vieworder from '@/pages/Vieworder'
import Payment from '@/pages/Payment'

import Back from '@/pages/Back/Intro.vue'
import Dashboard from '@/pages/Back/Dashboard.vue'
import Backwebboard from '@/pages/Back/Backwebboard.vue'
import Editwebboard from '@/pages/Back/Editwebboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/reload',
      name: 'Reload',
      component: Reload
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/back',
      name: 'Back',
      component: Back
    },
    {
      path: '/backwebboard',
      name: 'Backwebboard',
      component: Backwebboard
    },
    {
      path: '/Editwebboard/:webboardid',
      name: 'Editwebboard',
      component: Editwebboard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/category/:lv1',
      name: 'Category',
      component: Category,
      children: [
        {
          path: '',
          component: Category
        },
        {
          path: ':lv2',
          component: Category
        }
      ]
    },
    {
      path: '/viewproduct/:productId',
      name: 'Viewproduct',
      component: Viewproduct
    },
    {
      path: '/vieworder/:orderid',
      name: 'Vieworder',
      component: Vieworder
    },
    {
      path: '/webboard',
      name: 'Webboard',
      component: Webboard
    },
    {
      path: '/viewwebboard/:id',
      name: 'Viewwebboard',
      component: Viewwebboard
    },
    {
      path: '/checkout/:id',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/payment/:orderid',
      name: 'Payment',
      component: Payment
    }
  ]
})
