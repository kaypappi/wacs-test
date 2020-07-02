import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import AdminUser from './module/AdminUser';
import ResetPassword from './module/PasswordReset';
import UserStatus from './module/UserStatus';
import LoanRequest from './module/LoanRequest'
import LoanOffers from "./module/LoanOffers"
import IppisLoanRequest from "./module/IppisLoanRequest"
import AdminLoanRequest from "./module/AdminLoanRequest"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    validation: []
  },

  mutations: {
    SET_VALIDATION_ERROR (state, errors) {
      state.validation = errors;
    },
    CLEAR_ONE_VALIDATION_ERROR (state, field) {
      delete state.validation[field];
    },
  },

  getters :{
    getValidationError(state){
      return state.validation
    },
  },

  actions: {
    setValidationErrors({ commit }, errors){
      commit('SET_VALIDATION_ERROR', errors.errors);
    },

    clearAllValidationErrors({ commit },){
      commit('SET_VALIDATION_ERROR', [])
    },
    clearOneValidationError({ commit }, field){
      commit('CLEAR_ONE_VALIDATION_ERROR', field)
    }
  },

  modules: {
    auth,
    AdminUser,
    ResetPassword,
    UserStatus,
    LoanRequest,
    LoanOffers,
    IppisLoanRequest,
    AdminLoanRequest
  }
})
