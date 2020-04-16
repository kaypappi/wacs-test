import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue';
import ResetPassword from '../views/Auth/Reset-password.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store'
import Main from "../components/Layout/Main";
import UserSetup from "../views/UserSetup";
import LoanRequest from "../views/LoanRequest";
import LoanOffers from "../views/LoanOffers";
import MakeOffer from "../views/makeOffer";
import LoanRequestDetails from "../views/LoanRequestDetails";
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
          name: 'home'
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
        name: 'userManagement',
        component: UserSetup,
        meta: {
          title: 'Users',
          nameSpace: 'users',
        },
        beforeEnter: (to, from, next) => {
          if(!store.getters['auth/isSuperAdmin']) {
            return next('home')
          }
          next()
        }
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: 'WACS',
        },
      },
      {
        path: '/loan-request',
        name: 'loanRequest',
        component: LoanRequest,
        meta: {
          title: 'Loan Management',
          nameSpace: 'loan',
        },
      },
      {
        path: '/loan-request/:requestId',
        name: 'loanRequestDetails',
        component: LoanRequestDetails,
        meta: {
          title: 'Loan Details',
          nameSpace: 'loan',
          parents: ['Loan Request'],
        },
      },
      {
        path: '/loan-offers',
        name: 'loanOffers',
        component: LoanOffers,
        meta: {
          title: 'Loan Management',
          nameSpace: 'loan',
        },
      },
      {
        path: '/make-offer',
        name: 'makeOffer',
        component: MakeOffer,
        meta: {
          title: 'Make Offer',
          nameSpace: 'loan',
          parents: ['Loan Request', 'Loan Details'],
        },
      },
      {
        path: '/change-password',
        name: 'changePassword',
        component: ResetPassword,
        meta: {
          title: 'Change Password',
        },
      },
      {
        path: '/password-reset/:token',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
          title: 'Reset Password',
        },
        beforeEnter: (to, from, next) => {
          store.dispatch('ResetPassword/confirmToken', to.params.token)
          next()
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated'] && to.name != 'resetPassword') {
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
