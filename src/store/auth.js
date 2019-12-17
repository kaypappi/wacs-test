import axios from 'axios'
export default ({
  namespaced:  true,

  state: {
    token:'',
    user: {}
  },

  getters :{
    authenticated(state){
      return state.token && state.user
    },

    user(state){
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, data) {
      state.token = data.token_type+' '+data.access_token;
    },
    SET_USER(state, data){
      state.user = data
    }
  },

  actions: {
    async signIn({ dispatch }, credentials){
      let response  = await axios.post('creditor/login', credentials)
      const {access_token, token_type} = response.data.data;
      console.log(access_token);
      dispatch('attempt', {access_token, token_type})
    },

    async attempt ({ commit }, data){
      commit('SET_TOKEN', data);
      try {
        let response = await axios.get('creditor/dashboard', {
          headers:{
            'Authorization' : data.token_type+' '+data.access_token
          }
        });
        console.log(response.data);

        commit('SET_USER', response.data)
      } catch(e){
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        console.log(e)
      }
    }

  },

})
