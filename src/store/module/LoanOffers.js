import axios from "axios";

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
    SHOW_TOAST(state, title, message, success) {
      state.toast = { show: true, title, message, success };
      setTimeout(() => {
        state.toast.show = false;
      }, 2000);
    },
    CREATING_OFFER(state, status) {
      state.creatingOffer = status;
    },
    DELETE_LOANOFFER_ROW(state, row) {
      const index = state.loanOffers.data.findIndex((x) => x.id === row);
      state.loanOffers.data.splice(index, 1);
    },
    UPDATE_LOAN_OFFER(state, newRow) {
      const index = state.loanOffers.data.findIndex((x) => x.id === newRow.id);
      state.loanOffers.data.splice(index, 1, newRow);
    },
  },
  actions: {
    fetchLoanOffers({ commit }, query) {
      commit("IS_FETCHING_LOANOFFERS", true);
      axios.get(`creditor/offer/view?${query}`).then((response) => {
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
      axios.get(`creditor/offer/search/${query.search}`).then((response) => {
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
    createLoanOffer({ commit, dispatch }, {data,closeModal}) {
      commit("CREATING_OFFER", true);
      axios
        .post(`creditor/offer/create`, data)
        .then((response) => {
            console.log(response)
          commit("CREATING_OFFER", false);
          commit("SHOW_TOAST", "Successful!", "You created a loan offer", true);
          closeModal()
          dispatch("fetchLoanOffers");
        })
        .catch((err) => {
          commit("CREATING_OFFER", false);
          commit("SHOW_TOAST", "Successful!", err.response.data.message, false);
        });
    },
    editLoanOffer({ commit ,dispatch}, {data,closeModal}) {
      axios
        .post("creditor/offer/update", data)
        .then((response) => {
          commit("UPDATE_LOAN_OFFER", response.data.data);
          closeModal()
          commit("SHOW_TOAST", "Successful", response.data.message, true);
          dispatch("fetchLoanOffers");
        })
        .catch((err) => {
          commit("SHOW_TOAST", "Error", err.response.data.message, false);
        });
    },
    updateLoanOffers({ commit }, newRow) {
      commit("UPDATE_LOAN_OFFER", newRow);
    },
    deleteLoanOffer({ commit }, url, row) {
      axios
        .get(url)
        .then((response) => {
          commit("DELETE_LOANOFFER_ROW", row);
          commit("SHOW_TOAST", "Successful!", response.data.message, true);
        })
        .catch((err) => {
          commit("SHOW_TOAST", "Error", err.response.data.message, false);
        });
    },
    changeStatus({ commit }, url) {
      axios
        .get(url)
        .then((response) => {
          commit("UPDATE_LOAN_OFFER", response.data.data);
        })
    },
  },
};
