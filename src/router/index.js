import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store'
import Main from "../components/Layout/Main";
import UserSetup from "../views/UserSetup";
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
          name: 'user-setup'
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
        name: 'user-setup',
        component: UserSetup
      }
    ],
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']) {
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
