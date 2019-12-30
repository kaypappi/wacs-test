import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import AdminUser from './module/AdminUser'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },

  mutations: {
  },

  actions: {
  },

  modules: {
    auth,
    AdminUser
  }
})
