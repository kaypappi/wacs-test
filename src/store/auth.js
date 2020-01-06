import axios from 'axios'
export default ({
  namespaced:  true,

  state: {
    access_token:'',
    user: {}
  },

  getters :{
    authenticated(state){
      return (state.access_token && state.user)
    },

    user(state){
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, access_token) {
      state.access_token = 'Bearer'+' '+access_token;
    },
    SET_USER(state, data){
      state.user = data
    }
  },

  actions: {
    async signIn({ commit, dispatch }, credentials){
      commit('SET_VALIDATION_ERROR', [], {root: true});
      let response  = await axios.post('creditor/login', credentials);

      //const {access_token, token_type} = response.data.data;
      //console.log(access_token);
      return dispatch('attempt', response.data.data.access_token)
    },

    async attempt ({ commit, state }, access_token){
      if(access_token){
        commit('SET_TOKEN', access_token);
      }
      if (!state.access_token){
        return
      }
      try {
        let response = await axios.get('creditor/dashboard');

        commit('SET_USER', response.data)
      } catch(e){
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      }
    }

  },

})
