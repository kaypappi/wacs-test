import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue';
import ResetPassword from '../views/Auth/Reset-password.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store'
import Main from "../components/Layout/Main";
import UserSetup from "../views/UserSetup";
import LoanMangement from "../views/LoanMangement";
import Home from "../views/Home";
import {beforeEach} from './beforeEach';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters['auth/authenticated']) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'user-setup',
        name: 'User',
        component: UserSetup,
        beforeEnter: (to, from, next) => {
          if(!store.getters['auth/isSuperAdmin']) {
            return next('Home')
          }
          next()
        }
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/loan',
        name: 'Loan Management',
        component: LoanMangement,
      },
      {
        path: '/change-password',
        name: 'change password',
        component: ResetPassword,
      },
      {
        path: '/password-reset/:token',
        name: 'reset password',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
          store.dispatch('ResetPassword/confirmToken', to.params.token)
          next()
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated'] && to.name != 'reset password') {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(beforeEach);

export default router
