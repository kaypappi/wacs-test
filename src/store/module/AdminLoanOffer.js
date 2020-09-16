import admin from "../Api/admin";

export default {
  namespaced: true,
  state: {
    fetchingOffers: false,
    creatingOffer: false,
    searchFound: true,
    loanOffers: {},
    toast: {
      show: false,
      title: "",
      message: "",
      success: false,
    },
    searchTerm: "",
  },
  mutations: {
    IS_FETCHING_LOANOFFERS(state, status) {
      state.fetchingOffers = status;
    },
    UPDATE_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    UPDATE_SEARCH_FOUND(state, status) {
      state.searchFound = status;
    },
    FETCH_LOANOFFERS_NOTFOUND(state) {
      state.searchFound = false;
    },
    FETCH_LOANOFFERS_FOUND(state, data) {
      state.loanOffers = { ...data };
      state.searchTerm = "";
      state.searchFound = true;
    },
    SEARCH_LOANOFFERS_NOTFOUND(state) {
      state.searchFound = false;
    },
    SEARCH_LOANOFFERS_FOUND(state, data) {
      (state.searchTerm = ""), (state.searchFound = true);
      state.loanOffers = { ...data };
    },
    SHOW_TOAST(state, { title, message, success }) {
      state.toast = { show: true, title, message, success };
      setTimeout(() => {
        state.toast.show = false;
      }, 2000);
    },
  },
  actions: {
    fetchLoanOffers({ commit }, query) {
      commit("IS_FETCHING_LOANOFFERS", true);
      admin.fetchLoanOffers(query).then((response) => {
        commit("IS_FETCHING_LOANOFFERS", false);
        if (response.data.data.length === 0) {
          commit("FETCH_LOANOFFERS_NOTFOUND");
        } else {
          commit("FETCH_LOANOFFERS_FOUND", response.data);
        }
      });
    },
    searchOffers({ commit }, query) {
      commit("IS_FETCHING_LOANOFFERS", true);
      admin.searchOffers(query).then((response) => {
        commit("IS_FETCHING_LOANOFFERS", false);
        if (response.data.data.length === 0) {
          commit("SEARCH_LOANOFFERS_NOTFOUND");
        } else {
          commit("SEARCH_LOANOFFERS_FOUND", response.data);
        }
      });
    },
    updateSearchTerm({ commit }, searchTerm) {
      commit("UPDATE_SEARCH_TERM", searchTerm);
    },
    updateSearchFound({ commit }, status) {
      commit("UPDATE_SEARCH_FOUND", status);
    },

    updateLoanOffers({ commit }, newRow) {
      commit("UPDATE_LOAN_OFFER", newRow);
    },
  },
};
