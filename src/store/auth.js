import axios from 'axios'
import {getUrlPath} from "../helpers/getPath";

export default ({
  namespaced:  true,

  state: {
    access_token:'',
    userType: '',
    user: {},
    isLoading: false,
    loginError: ''
  },

  getters :{
    authenticated(state){
      return (state.access_token && state.user)
    },
    isSuperAdmin(state){
      return state.user.data.roles[0].name === 'Super Admin';
    },
    isParkwayAdmin(state){
      return state.user.data.roles[0].name === 'Admin';
    },
    isIppisAdmin(state){
      return state.user.data.roles[0].name === 'IPPIS';
    },
    user(state){
      return state.user
    },
    isLoading(state){
      return state.isLoading
    },
    loginError(state){
      return state.loginError
    }
  },

  mutations: {
    SET_TOKEN (state, access_token) {
      state.access_token = 'Bearer'+' '+access_token;
    },
    SET_USER(state, data){
      state.user = data
    },
    IS_LOGGING_USER_IN(state, bool){
      state.isLoading = bool;
    },
    SET_ERROR_MESSAGE(state, error) {
      state.loginError = error;
    },
  },

  actions: {
    async signIn({ commit,dispatch }, {credentials}){
      commit('SET_VALIDATION_ERROR', [], {root: true});
      commit('SET_ERROR_MESSAGE', null);
      commit('IS_LOGGING_USER_IN', true);

      try{
        let response  = await axios.post(`${getUrlPath()}/login`, credentials);
        return dispatch('attempt', response.data.data.access_token);
      } catch(e){
        commit('SET_ERROR_MESSAGE', e.response.data.message);
        commit('IS_LOGGING_USER_IN', false);
        return Promise.reject(e);
      }
    },

    async attempt ({ commit, state }, access_token){
      if(access_token){
        commit('SET_TOKEN', access_token);
      }
      if (!state.access_token){
        return
      }
      try {
        let response = await axios.get(`${getUrlPath()}/dashboard`);
        commit('IS_LOGGING_USER_IN', false);
        commit('SET_USER', response.data)
      } catch(e){
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      }
    },

    clearOneError({commit}) {
      commit('IS_LOGGING_USER_IN', false);
    },

    async logout({commit}) {
      let response = await axios.post('user/logout');
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      return response;
    },
  },

})
