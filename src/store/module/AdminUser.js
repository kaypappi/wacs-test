import axios from 'axios';

export default ({
  namespaced:  true,

  state : {
    adminUsers: [],
    isGettingAdmins: false,
    isPostingAdmin: false,
    postAdminSuccess: false,
  },

  mutations : {
    FETCH_ADMIN_SUCCESS(state, adminData) {
      state.adminUsers = adminData;
    },
    IS_GETTING_ADMIN(state, isgetting) {
      state.isGettingAdmins = isgetting;
    },
    IS_POSTING_ADMIN(state, isPosting) {
      state.error = {};
      state.isPostingAdmin = isPosting;
    },
    CREATE_ADMIN_SUCCESS(state, userData) {
      state.adminUsers.push(userData);
      state.postAdminSuccess = true;
    },
    RESET_POST_ADMIN_STATUS(state) {
      state.postAdminSuccess = false;
    }
  },

   actions : {
    fetchAdmins({commit}) {
      commit('IS_GETTING_ADMIN', true)
      axios.get('creditor').then((res) => {
        commit('IS_GETTING_ADMIN', false);
        commit('FETCH_ADMIN_SUCCESS', res.data.data);
      })
    },
    createAdmin({commit}, userData) {
      commit('IS_POSTING_ADMIN', true);
      axios.post('creditor', userData)
          .then(function (res) {
            commit('IS_POSTING_ADMIN', false);
            commit('CREATE_ADMIN_SUCCESS', res.data.data);
          })
          .catch(function () {
            commit('IS_POSTING_ADMIN', false);
          });
    },
    resetPostingStatus({commit}) {
      commit('RESET_POST_ADMIN_STATUS');
    }
  }
});