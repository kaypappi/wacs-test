import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as mutations from "./mutations"
import * as getters from "./getters"
import * as actions from "./actions"
import state from "./state"

import AdminLoanOffer from "./module/Admin/LoanOffer"
import AdminLoanRequest from "./module/Admin/LoanRequest"
import AdminUser from "./module/Admin/User"

import CreditorLoanOffer from "./module/Creditor/LoanOffer"
import CreditorLoanRequest from "./module/Creditor/LoanRequest"
import CreditorUser from "./module/Creditor/User"
import CreditorDeduction from "./module/Creditor/Deduction"

import IppisLoanRequest from "./module/Ippis/LoanRequest"
import IppisUserMangement from "./module/Ippis/UserManagement"
import IppisMini from "./module/Ippis/IppisMini"

import Auth from "./module/Auth/Auth"
import PasswordReset from "./module/Auth/PasswordReset"

import UserAuth from "./module/User/Auth"
import UserLoanOffers from "./module/User/LoanOffers"



export default new Vuex.Store({
  
  state,
  getters,
  mutations,
  actions,
  

  modules: {
    AdminLoanOffer,
    AdminLoanRequest,
    AdminUser,
    CreditorLoanOffer,
    CreditorLoanRequest,
    CreditorUser,
    CreditorDeduction,
    IppisLoanRequest,
    IppisUserMangement,
    IppisMini,
    Auth,
    PasswordReset,
    UserAuth,
    UserLoanOffers
  }
})
