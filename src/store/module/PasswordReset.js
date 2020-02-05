import axios from 'axios';
import { EventBus } from '@/event.js';

export default ({
  namespaced:  true,

  state : {
    isLoading: false, 
    resetSuccess: false,
    tokenIsInvalid: false,
    tokenIsValid: false,
    error: '',
  },

  mutations : {
    IS_POSTING(state, bool) {
      state.isLoading = bool;
    },
    RESET_SUCCESS(state, bool) {
      state.resetSuccess = bool;
    },
    SET_INVALID_TOKEN(state) {
      state.tokenIsInvalid = true;
    },
    SET_VALID_TOKEN(state) {
      state.tokenIsValid = true;
    },
    SET_ERROR_MESSAGE(state, error) {
      state.error = error;
    },
  },

   actions : {
    confirmToken({commit}, token) {
      axios.get('user/password/'+token).then(() => {
        commit('SET_VALID_TOKEN');
      })
      .catch(function () {
        commit('SET_INVALID_TOKEN');
      });
    },
    resetPassword({commit}, data) {
      commit('IS_POSTING', true);
      axios.post('user/password/reset', data)
          .then(function () {
            commit('IS_POSTING', false);
            commit('RESET_SUCCESS', true);
          })
          .catch(function () {
            commit('IS_POSTING', false);
          });
    },
    changePassword({commit}, data) {
      commit('SET_ERROR_MESSAGE', null);
      commit('IS_POSTING', true);
      axios.post('user/password/change', data)
          .then(function () {
            commit('IS_POSTING', false);
            commit('RESET_SUCCESS', true);
          })
          .catch(function (err) {
            commit('SET_ERROR_MESSAGE', err.response.data.message);
            commit('IS_POSTING', false);
          });
    },
    sendPasswordResetLink({commit}, data) {
      commit('IS_POSTING', true);
      axios.post('user/password/forget', data)
          .then(function () {
            commit('IS_POSTING', false);
            commit('RESET_SUCCESS', true);
            EventBus.$emit('success', true);
          })
          .catch(function () {
            commit('IS_POSTING', false);
            EventBus.$emit('success', false);
          });
    },
    resetPasswordSuccess({commit}) {
      commit('RESET_SUCCESS', false);
    },
  }
});