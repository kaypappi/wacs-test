import axios from "axios";
//import router from "../../router/index"

export default {
  namespaced: true,
  errors: {},
  state: {
      fetchingSummary:false,
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
  },
  actions: {
    requestsSummary({ commit }) {
      commit("FETCHING_SUMMARY", true);
      axios.get("admin/requests/counts").then((response) => {
        console.log(response)
        commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data.count);
        commit("FETCHING_SUMMARY", false);
      });
    },
  },
};
