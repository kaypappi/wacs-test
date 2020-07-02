import axios from "axios";
//import router from "../../router/index"

export default {
  namespaced: true,
  errors: {},
  state: {
      fetchingSummary:false,
      isFetchingLoanRequests: false,
      loanRequests: [],
      searchFound: true,
      requestsSummary:{
        total:0,
        pending:0,
        running:0,
        bank_approved:0,
        rejected:0,
        awaiting_ippis:0
      },
  },
  mutations: {
    FETCHING_SUMMARY(state, status) {
      state.fetchingSummary = status;
    },
    FETCH_REQUEST_SUMMARY_SUCCESS(state, data) {
      state.requestsSummary = { ...data };
    },
    IS_FETCHING_LOANREQUEST(state, isFetching) {
      state.isFetchingLoanRequests = isFetching;
    },
    FETCH_ADMIN_FOUND(state, data) {
      state.loanRequests = { ...data };
      state.searchFound = true;
    },
    FETCH_ADMIN_NOTFOUND(state) {
      state.searchFound = false;
    },
  },
  actions: {
    requestsSummary({ commit }) {
      commit("FETCHING_SUMMARY", true);
      axios.get("admin/requests/counts").then((response) => {
        commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data.count);
        commit("FETCHING_SUMMARY", false);
      });
    },
    fetchAdminLoanRequests({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      axios.get(`admin/requests?${query}`).then((response) => {
        commit("IS_FETCHING_LOANREQUEST", false);
        if (response.data.data.length === 0) {
          commit("FETCH_ADMIN_NOTFOUND");
        } else {
          commit("FETCH_ADMIN_FOUND", response.data);
        }
      });
    },
  },
};
