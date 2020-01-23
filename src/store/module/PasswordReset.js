import axios from 'axios';

export default ({
  namespaced:  true,

  state : {
    isLoading: false, 
    resetSuccess: false,
    tokenIsInvalid: false,
    tokenIsValid: false,
  },

  mutations : {
    IS_POSTING(state, bool) {
      state.isLoading = bool;
    },
    RESET_SUCCESS(state) {
      state.resetSuccess = true;
    },
    SET_INVALID_TOKEN(state) {
      state.tokenIsInvalid = true;
    },
    SET_VALID_TOKEN(state) {
      state.tokenIsValid = true;
    },
  },

   actions : {
    confirmToken({commit}, token) {
    //   commit('IS_GETTING_ADMIN', true)
      axios.get('user/password/'+token).then(() => {
        commit('SET_VALID_TOKEN');
      })
      .catch(function (err) {
        console.log(err, 'tokeennnnnnnnnnnn');
        commit('SET_INVALID_TOKEN');
      });
    },
    resetPassword({commit}, data) {
      commit('IS_POSTING', true);
      axios.post('user/password/reset', data)
          .then(function () {
            commit('IS_POSTING', false);
            commit('RESET_SUCCESS');
          })
          .catch(function () {
            commit('IS_POSTING', false);
          });
    },
  }
});