import axios from 'axios';

export const state = {
  adminUsers: null,
  isGettingAdmins: false,
  isPostingAdmin: false,
  error: [],
}

export const mutations = {
  FETCH_ADMIN_SUCCESS(state, adminData) {
    state.adminUsers = adminData;
  },
  IS_GETTING_ADMIN(state, isgetting) {
    state.isGettingAdmins = isgetting;
  },
  IS_POSTING_ADMIN(state, isPosting) {
    state.isPosting = isPosting;
  },
  CREATE_ADMIN_SUCCESS(state, userData) {
    state.adminUsers.push(userData);
  },
  CREATE_ADMIN_ERROR(state, error) {
    state.error.push(error);
  },
}

export const actions = {
  fetchAdmins({ commit }) {
    commit('IS_GETTING_ADMIN', true)
    axios.get('http://127.0.0.1:8000/api/v1/user/creditor').then((res) => {
      commit('IS_GETTING_ADMIN', false);
      commit('FETCH_ADMIN_SUCCESS', res.data);
    })
  },
  createAdmin({ commit }, userData) {
    commit('IS_POSTING_ADMIN', true);
    axios.post('http://127.0.0.1:8000/api/v1/user/creditor', userData)
    .then(function (res) {
        console.log(res);
        commit('IS_POSTING_ADMIN', false);
        commit('CREATE_ADMIN_SUCCESS', res.data);
    })
    .catch(function (error) {
        commit('IS_POSTING_ADMIN', false);
        commit('CREATE_ADMIN_ERROR', error.response.data);
        console.log(error.response.data);
    });
  },
}