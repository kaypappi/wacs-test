import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import AdminUser from './module/AdminUser'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    validation: []
  },

  mutations: {
    SET_VALIDATION_ERROR (state, errors) {
      state.validation = errors;
    },
  },

  getters :{
    getValidationError(state){
      return state.validation
    },
  },

  actions: {
    setValidationErrors({ commit }, errors){
      commit('SET_VALIDATION_ERROR', errors.errors)
    },

    clearValidationErrors({ commit },){
      commit('SET_VALIDATION_ERROR', [])
    }
  },

  modules: {
    auth,
    AdminUser
  }
})
