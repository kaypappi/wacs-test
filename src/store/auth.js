import axios from 'axios'
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
    SET_TOKEN (state, {access_token, userType}) {
      state.access_token = 'Bearer'+' '+access_token;
      state.userType = userType;
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
    async signIn({ commit,dispatch }, {credentials,userType}){
      commit('SET_VALIDATION_ERROR', [], {root: true});
      commit('SET_ERROR_MESSAGE', null);
      commit('IS_LOGGING_USER_IN', true);
      try{
        let response  = await axios.post(`${userType}/login`, credentials);
        return dispatch('attempt', {access_token:response.data.data.access_token, userType});
      } catch(e){
        commit('SET_ERROR_MESSAGE', e.response.data.message);
        commit('IS_LOGGING_USER_IN', false);
        return Promise.reject(e);
      }
    },

    async attempt ({ commit, state }, {access_token, userType}){
      console.log(userType)
      if(access_token){
        commit('SET_TOKEN', {access_token, userType});
      }
      if (!state.access_token){
        return
      }
      try {
        let response = await axios.get(`${userType}/dashboard`);
        console.log(response)
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
