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
import Repayment from "../views/Repayment";
import Schedule from "../views/Schedule"
import Notifications from "../views/Notifcations.vue"
import FrontPage from "../views/FrontPage.vue"
import IppisLoanRequest from "../views/Ippis/LoanRequest"
import IppisLoanRequestDetails from "../views/Ippis/LoanRequestDetails"
import IppisLogin from "../views/Ippis/Auth/Login.vue"
import IppisSchedule from "../views/Ippis/IppisSchedule.vue"
import {beforeEach} from './beforeEach';
import IppisMain from '../components/Layout/IppisMain.vue'
import AdminLogin from  "../views/Admin/Auth/AdminLogin.vue"
import AdminMain from "../components/Layout/AdminMain.vue"
import AdminDashboard from "../views/Admin/AdminDashboard.vue"
import AdminLoanRequest from "../views/Admin/AdminLoanRequest.vue"
import AdminLoanOffers from "../views/Admin/AdminLoanOffer.vue"
import AdminReapayment from "../views/Admin/AdminRepayment.vue"
import AdminSchedule from "../views/Admin/AdminSchedule.vue"
import AdminLoanRequestDetails from "../views/Admin/AdminLoanrequestDetails.vue"
import IppisUserSetup from "../views/Admin/IppisUserSetup.vue"
import CreditorUserSetup from "../views/Admin/CreditorUserSetup.vue"

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
    path: '/frontpage',
    name: 'frontPage',
    component: FrontPage,
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
          title: 'Workers Aggregated Credit Scheme',
        },
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: Notifications,
        meta: {
          title: 'Notifications',
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
        props: true,
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
        path: '/make-offer/:loan_request_id',
        name: 'makeOffer',
        component: MakeOffer,
        props:true,
        meta: {
          title: 'Make Offer',
          nameSpace: 'loan',
          parents: ['Loan Request', 'Loan Details'],
        },
      },
      {
        path:'/report/:id',
        name:'repaymentsSchedule',
        component:Schedule,
        meta:{
          title: 'Schedule Details',
          nameSpace:'loan',
          parents:['Report']
        }
      },
      {
        path:'/report',
        name:'repayments',
        component:Repayment,
        meta:{
          title:'Report',
          nameSpace:'loan'
        }
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
    path:'/ippis',
    name:'ippisLogin',
    component:IppisLogin,
    beforeEnter: (to, from, next) => {
      if(store.getters['auth/authenticated']) {
        return next({
          name: 'ippisLoanRequest'
        })
      }
      next()
    }
  },
  {
    path:'/ippis',
    component:IppisMain,
    children:[
      {
        path:'/ippis/dashboard',
        name:'ippisLoanRequest',
        component:IppisLoanRequest,
        meta:{
          title:'Loan Request',
          nameSpace:'loan'
        }
      },
      {
        path:'/ippis/notifications',
        name:'ippisNotifications',
        component:IppisLoanRequest,
        meta:{
          title:'Loan Request',
          nameSpace:'ippis'
        }
      },
      {
        path:'/ippis/:requestId',
        name:'ippisLoanDetails',
        component:IppisLoanRequestDetails,
        meta:{
          title:'Loan Details',
          nameSpace:'ippis',
          parents: ['Loan Request'],
        }
      },
      {
        path:'/ippis/report/:id',
        name:'ippisLoanReport',
        component:IppisSchedule,
        meta:{
          title:'Loan Report',
          nameSpace:'ippis',
        },
        parents:["Loan Request","Loan Details"]
      },
    ],
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/isIppisAdmin']) {
        return next({
          name: 'ippisLogin'
        })
      }
      next()
    }
  },
  {
    path: '/admin',
    name: 'Adminlogin',
    component: AdminLogin,
    beforeEnter: (to, from, next) => {
      if(store.getters['auth/authenticated']) {
        return next({
          name: 'adminDashboard'
        })
      }
      next()
    }
  },
  {
    path:'/admin',
    component:AdminMain,
    children:[
      {
        path:'/admin/dashboard',
        name: 'adminDashboard',
        component:AdminDashboard,
        meta:{
          title:"Admin Dashboard",
          nameSpace:'Admin'
        },
        beforeEnter: (to, from, next) => {
          if(!store.getters['auth/isParkwayAdmin']) {
            return next('Adminlogin')
          }
          next()
        }
      },
      {
        path:'/admin/loan-request',
        name: 'adminLoanRequest',
        component:AdminLoanRequest,
        meta:{
          title:"Loan Management",
          nameSpace:'loan'
        },
        beforeEnter: (to, from, next) => {
          if(!store.getters['auth/isParkwayAdmin']) {
            return next('Adminlogin')
          }
          next()
        }
      },
      {
        path:'/admin/loan-request/:requestId',
        name:'adminLoanDetails',
        component:AdminLoanRequestDetails,
        meta:{
          title:'Loan Details',
          nameSpace:'loan',
          parents: ['Loan Request'],
        }
      },
      {
        path: '/admin/loan-offers',
        name: 'AdminLoanOffers',
        component: AdminLoanOffers,
        meta: {
          title: 'Loan Management',
          nameSpace: 'loan',
        },
      },
      {
        path:'/admin/report/:id',
        name:'adminrepaymentsSchedule',
        component:AdminSchedule,
        meta:{
          title: 'Schedule Details',
          nameSpace:'loan',
          parents:['Report']
        }
      },
      {
        path:'/admin/report',
        name:'adminrepayments',
        component:AdminReapayment,
        meta:{
          title:'Report',
          nameSpace:'loan'
        }
      },
      {
        path:'/admin/ippis',
        name:'IppisAdminUsers',
        component:IppisUserSetup,
        meta:{
          title:'Ippis Users',
          nameSpace:'users'
        }
      },
      {
        path:'/admin/creditors',
        name:'CreditorAdminUsers',
        component:CreditorUserSetup,
        meta:{
          title:'Creditors',
          nameSpace:'users'
        }
      },
    ]
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
