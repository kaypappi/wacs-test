import { EventBus } from '@/event.js';
import creditor from '../Api/creditor';

export default ({
  namespaced:  true,

  state : {
    isToggleSuccess: false,
  },

  mutations : {
    SET_TOGGLE_SUCCESS(state, bool) {
      state.isToggleSuccess = bool;
    },
  },

   actions : {
    toggleUserStatus({commit, dispatch}, id) {
      creditor.toggleUserStatus(id).then((data) => {
        const newStatus = data.data.data.status;
        commit('SET_TOGGLE_SUCCESS', true);
        EventBus.$emit('success', true);
        dispatch('AdminUser/updateUserStatus', {id, newStatus}, { root: true })
      })
      .catch(function () {
        EventBus.$emit('success', false);
      });
    },

    resetSuccess({commit}) {
      commit('SET_TOGGLE_SUCCESS', false);
    },
  },
});