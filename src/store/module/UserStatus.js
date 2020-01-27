import axios from 'axios';
import { EventBus } from '@/event.js';

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
      axios.post('creditor/isactive/'+id).then((data) => {
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