import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Auth/Login.vue";
import ResetPassword from "../views/Auth/Reset-password.vue";
import ForgotPassword from "../views/Auth/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "../store";
import Main from "../components/Layout/Main";

import UserSetup from "../views/Creditor/UserSetup";
import LoanRequest from "../views/Creditor/LoanRequest";
import LoanOffers from "../views/Creditor/LoanOffers";
import MakeOffer from "../views/Creditor/makeOffer";
import LoanRequestDetails from "../views/Creditor/LoanRequestDetails";
import Home from "../views/Creditor/Home.vue";
import Repayment from "../views/Creditor/Repayment";
import Loans from "../views/Creditor/Loans.vue";
import Schedule from "../views/Creditor/Schedule";
import Deduction from "../views/Creditor/Deduction.vue";
import Notifications from "../views/Notifcations.vue";
import FrontPage from "../views/FrontPage.vue";

import IppisLoanRequest from "../views/Ippis/LoanRequest";
import IppisLoanRequestDetails from "../views/Ippis/LoanRequestDetails";
import IppisLogin from "../views/Ippis/Auth/Login.vue";
import IppisSchedule from "../views/Ippis/IppisSchedule.vue";
import IppisUserManagement from "../views/Ippis/UserSetup.vue";
import { beforeEach } from "./beforeEach";
import IppisMain from "../components/Layout/IppisMain.vue";

import IppisMasterRecords from "../views/Ippis/Mini/IppisMasterRecords.vue";

import AdminLogin from "../views/Admin/Auth/AdminLogin.vue";
import AdminMain from "../components/Layout/AdminMain.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import AdminLoanRequest from "../views/Admin/AdminLoanRequest.vue";
import AdminLoanOffers from "../views/Admin/AdminLoanOffer.vue";
import AdminReapayment from "../views/Admin/AdminRepayment.vue";
import AdminSchedule from "../views/Admin/AdminSchedule.vue";
import AdminLoanRequestDetails from "../views/Admin/AdminLoanrequestDetails.vue";
import AdminCompany from "../views/Admin/AdminCompany.vue";
import IppisUserSetup from "../views/Admin/IppisUserSetup.vue";
import CreditorUserSetup from "../views/Admin/CreditorUserSetup.vue";

import StaffMainAuth from "../views/Staff/Auth/Main.vue";
import StaffDashboard from "../views/Staff/Dashboard.vue";
import StaffMain from "../components/Layout/StaffMain.vue";
import StaffNewLoanRequest from "../views/Staff/NewLoanRequest.vue";
import StaffLoanOffers from "../views/Staff/LoanOffers.vue";
import StaffLoanRequestSuccess from "../views/Staff/LoanRequestSuccess.vue";
import StaffLoanDetails from "../views//Staff/LoanDetails.vue";
import StaffAccount from "../views/Staff/Account/Account.vue";
import StaffHelp from "../views/Staff/Account/Help.vue";
import StaffAbout from "../views/Staff/Account/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/creditor",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters["Auth/authenticated"]) {
        return next({
          name: "home",
        });
      }
      next();
    },
  },
  {
    path: "/password-reset/:token",
    name: "resetPassword",
    component: ResetPassword,
    meta: {
      title: "Reset Password",
    },
    beforeEnter: (to, from, next) => {
      store.dispatch("ResetPassword/confirmToken", to.params.token);
      next();
    },
  },
  {
    path: "/",
    name: "frontPage",
    component: FrontPage,
  },
  {
    path: "/creditor",
    component: Main,
    children: [
      {
        path: "/creditor/user-setup",
        name: "userManagement",
        component: UserSetup,
        meta: {
          title: "Users",
          nameSpace: "users",
        },
        beforeEnter: (to, from, next) => {
          console.log(store.getters["Auth/isSuperAdmin"]);
          if (!store.getters["Auth/isSuperAdmin"]) {
            return next("home");
          }
          next();
        },
      },
      {
        path: "creditor/password-reset/:token",
        name: "resetPassword",
        component: ResetPassword,
        meta: {
          title: "Reset Password",
        },
        beforeEnter: (to, from, next) => {
          store.dispatch("ResetPassword/confirmToken", to.params.token);
          next();
        },
      },
      {
        path: "/creditor/home",
        name: "home",
        component: Home,
        meta: {
          title: "Workers Aggregated Credit Scheme",
        },
      },
      {
        path: "/creditor/notifications",
        name: "notifications",
        component: Notifications,
        meta: {
          title: "Notifications",
        },
      },
      {
        path: "/creditor/loan-request",
        name: "loanRequest",
        component: LoanRequest,
        meta: {
          title: "Loan Management",
          nameSpace: "loan",
        },
      },
      {
        path: "/creditor/loan-request/:requestId",
        name: "loanRequestDetails",
        component: LoanRequestDetails,
        props: true,
        meta: {
          title: "Loan Details",
          nameSpace: "loan",
          parents: ["Loan Request"],
        },
      },
      {
        path: "/creditor/loan-offers",
        name: "loanOffers",
        component: LoanOffers,
        meta: {
          title: "Loan Management",
          nameSpace: "loan",
        },
      },
      {
        path: "/creditor/make-offer/:loan_request_id",
        name: "makeOffer",
        component: MakeOffer,
        props: true,
        meta: {
          title: "Make Offer",
          nameSpace: "report",
          parents: ["Loan Request", "Loan Details"],
        },
      },
      {
        path: "/creditor/report/:id",
        name: "repaymentsSchedule",
        component: Schedule,
        meta: {
          title: "Schedule Details",
          nameSpace: "report",
          parents: ["Report"],
        },
      },
      {
        path: "/creditor/report",
        name: "repayments",
        component: Repayment,
        meta: {
          title: "Report",
          nameSpace: "report",
        },
      },
      {
        path: "/creditor/loans",
        name: "loans",
        component: Loans,
        meta: {
          title: "Loans",
          nameSpace: "report",
        },
      },
      {
        path: "/creditor/deduction",
        name: "deduction",
        component: Deduction,
        meta: {
          title: "Deduction File",
          nameSpace: "deduction",
        },
      },

      {
        path: "/creditor/change-password",
        name: "changePassword",
        component: ResetPassword,
        meta: {
          title: "Change Password",
        },
      },
      {
        path: "/creditor/password-reset/:token",
        name: "resetPassword",
        component: ResetPassword,
        meta: {
          title: "Reset Password",
        },
        beforeEnter: (to, from, next) => {
          store.dispatch("ResetPassword/confirmToken", to.params.token);
          next();
        },
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters["Auth/authenticated"] && to.name != "resetPassword") {
        return next({
          name: "login",
        });
      }
      next();
    },
  },

  {
    path: "/ippis",
    name: "ippisLogin",
    component: IppisLogin,
    beforeEnter: (to, from, next) => {
      if (
        store.getters["Auth/authenticated"] &&
        store.getters["Auth/isIppisAdmin"]
      ) {
        if (store.getters["Auth/isIppisMini"]) {
          return next({ name: "ippisMasterRecords" });
        } else {
          return next({
            name: "ippisLoanRequest",
          });
        }
      }
      next();
    },
  },
  {
    path: "/ippis",
    component: IppisMain,
    children: [
      {
        path: "ippis/password-reset/:token",
        name: "resetPassword",
        component: ResetPassword,
        meta: {
          title: "Reset Password",
        },
        beforeEnter: (to, from, next) => {
          store.dispatch("ResetPassword/confirmToken", to.params.token);
          next();
        },
      },
      {
        path: "/ippis/masterrecords",
        name: "ippisMasterRecords",
        component: IppisMasterRecords,
        meta: {
          title: "Employee Records",
          nameSpace: "ippis mini",
        },
        beforeEnter: (to, from, next) => {
          if (!store.getters["Auth/isIppisMini"]) {
            return next({
              name: "ippisLogin",
            });
          }
          next();
        },
      },
      {
        path: "/ippis/dashboard",
        name: "ippisLoanRequest",
        component: IppisLoanRequest,
        meta: {
          title: "Loan Request",
          nameSpace: "loan",
        },
        beforeEnter: (to, from, next) => {
          if (store.getters["Auth/isIppisMini"]) {
            return next({ name: "ippisMasterRecords" });
          }
          next();
        },
      },
      {
        path: "/ippis/usermanagement",
        name: "ippisUserManagement",
        component: IppisUserManagement,
        meta: {
          title: "User Management",
          nameSpace: "usermanagement",
        },
      },
      {
        path: "/ippis/notifications",
        name: "ippisNotifications",
        component: Notifications,
        meta: {
          title: "Ippis Notifications",
        },
      },
      {
        path: "/ippis/:requestId",
        name: "ippisLoanDetails",
        component: IppisLoanRequestDetails,
        meta: {
          title: "Loan Details",
          nameSpace: "ippis",
          parents: ["Loan Request"],
        },
      },
      {
        path: "/ippis/report/:id",
        name: "ippisLoanReport",
        component: IppisSchedule,
        meta: {
          title: "Loan Report",
          nameSpace: "ippis",
        },
        parents: ["Loan Request", "Loan Details"],
      },
    ],
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["Auth/authenticated"] ||
        !store.getters["Auth/isIppisAdmin"]
      ) {
        return next({
          name: "ippisLogin",
        });
      }
      next();
    },
  },
  {
    path: "/admin",
    name: "Adminlogin",
    component: AdminLogin,
    beforeEnter: (to, from, next) => {
      if (store.getters["Auth/authenticated"]) {
        return next({
          name: "adminDashboard",
        });
      }
      next();
    },
  },
  {
    path: "/admin",
    component: AdminMain,
    children: [
      {
        path: "/admin/dashboard",
        name: "adminDashboard",
        component: AdminDashboard,
        meta: {
          title: "Admin Dashboard",
          nameSpace: "Admin",
        },
        beforeEnter: (to, from, next) => {
          if (!store.getters["Auth/isParkwayAdmin"]) {
            return next("Adminlogin");
          }
          next();
        },
      },
      {
        path: "/admin/notifications",
        name: "AdminNotifications",
        component: Notifications,
        meta: {
          title: "Loan Management",
        },
      },
      {
        path: "/admin/loan-request",
        name: "adminLoanRequest",
        component: AdminLoanRequest,
        meta: {
          title: "Loan Management",
          nameSpace: "loan",
        },
        beforeEnter: (to, from, next) => {
          if (!store.getters["Auth/isParkwayAdmin"]) {
            return next("Adminlogin");
          }
          next();
        },
      },
      {
        path: "/admin/loan-request/:requestId",
        name: "adminLoanDetails",
        component: AdminLoanRequestDetails,
        meta: {
          title: "Loan Details",
          nameSpace: "loan",
          parents: ["Loan Request"],
        },
      },
      {
        path: "/admin/loan-offers",
        name: "AdminLoanOffers",
        component: AdminLoanOffers,
        meta: {
          title: "Loan Management",
          nameSpace: "loan",
        },
      },
      {
        path: "/admin/report/:id",
        name: "adminrepaymentsSchedule",
        component: AdminSchedule,
        meta: {
          title: "Schedule Details",
          nameSpace: "loan",
          parents: ["Report"],
        },
      },
      {
        path: "/admin/report",
        name: "adminrepayments",
        component: AdminReapayment,
        meta: {
          title: "Report",
          nameSpace: "loan",
        },
      },
      {
        path: "/admin/ippis",
        name: "IppisAdminUsers",
        component: IppisUserSetup,
        meta: {
          title: "Ippis Users",
          nameSpace: "users",
        },
      },
      {
        path: "/admin/creditors",
        name: "CreditorAdminUsers",
        component: CreditorUserSetup,
        meta: {
          title: "Creditors",
          nameSpace: "users",
        },
      },
      {
        path: "/admin/company",
        name: "AdminCompany",
        component: AdminCompany,
        meta: {
          title: "Company",
          nameSpace: "users",
        },
      },
    ],
  },

  {
    path: "/user/login",
    name: "StaffLogin",
    component: StaffMainAuth,
    beforeEnter: (to, from, next) => {
      if (store.getters["Auth/authenticated"]) {
        return next({
          name: "staffDashboard",
        });
      }
      next();
    },
  },
  {
    path: "/user/signup",
    name: "StaffSignup",
    component: StaffMainAuth,
    beforeEnter: (to, from, next) => {
      if (store.getters["Auth/authenticated"]) {
        return next({
          name: "staffDashboard",
        });
      }
      next();
    },
  },
  {
    path: "/user",
    component: StaffMain,
    children: [
      {
        path: "/user",
        name: "staffDashboard",
        component: StaffDashboard,
        meta: {
          title: "Home",
          nameSpace: "home",
        },
      },
      {
        path: "/user/new-request",
        name: "newLoanRequest",
        component: StaffNewLoanRequest,
        meta: {
          title: "New Loan Request",
          nameSpace: "home",
        },
      },
      {
        path: "/user/loan-offers",
        name: "StaffLoanOffers",
        component: StaffLoanOffers,
        meta: {
          title: "Loan Offers",
          nameSpace: "home",
          parents: [{ title: "Loan requests", name: "newLoanRequest" }],
        },
      },
      {
        path: "/user/loan-details/:id",
        name: "StaffLoanDeatils",
        component: StaffLoanDetails,
        meta: {
          title: "Loan Details",
          nameSpace: "home",
          parents: [{ title: "Loan History", name: "staffDashboard" }],
        },
      },
      {
        path: "/user/loan-request-success",
        name: "StaffLoanRequestSuccess",
        component: StaffLoanRequestSuccess,
      },
      {
        path: "/user/account",
        name: "StaffAccount",
        component: StaffAccount,
        meta: {
          nameSpace: "account",
          title: "Account",
        },
        children: [
          {
            path: "/user/account/help",
            name: "StaffHelp",
            component: StaffHelp,
            meta: {
              nameSpace: "account",
              title: "Account",
            },
          },
          {
            path: "/user/account/about",
            name: "StaffAbout",
            component: StaffAbout,
            meta: {
              nameSpace: "account",
              title: "Account",
            },
          },
        ],
      },
    ],
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["Auth/authenticated"] &&
        to.name != "userChangePassword"
      ) {
        return next({
          name: "StaffLogin",
        });
      }
      next();
    },
  },
  {
    path: "/password",
    component: ForgotPassword,
    name: "forgotPassword",
  },
  {
    path: "/password/:token/",
    component: ForgotPassword,
    name: "userChangePassword",
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters["Auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(beforeEach);

export default router;
