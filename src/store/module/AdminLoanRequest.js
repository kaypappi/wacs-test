
import admin from "../Api/admin"
//import router from "../../router/index"

export default {
  namespaced: true,
  errors: {},
  state: {
    isFetchingLoanRequests: false,
    isFetchingLoanDetails: false,
    fetchingSummary: false,
    isFetchingLoanHistory: false,
    Loading: false,
    searchFound: true,
    loanRequests: [],
    loanDetails: {},
    loanHistory: [],
    requestsSummary: {
      total: 0,
      pending: 0,
      running: 0,
      bank_approved: 0,
      rejected: 0,
      awaiting_ippis: 0,
    },
    splitDetails: {
      offerId: "",
      customerName: "",
      firstRowBio: [],
      secondRowBio: [],
      thirdRowBio: [],
      loanDetailsRowOne: [],
      loanHistory: [],
    },
    searchTerm: "",
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
    IS_FETCHING_LOANDETAILS(state, status) {
      state.isFetchingLoanDetails = status;
    },
    FETCH_LOANDETAILS_SUCCESS(state, data) {
      state.loanDetails = { ...data };
    },
    FETCH_ADMIN_FOUND(state, data) {
      state.loanRequests = { ...data };
      state.searchFound = true;
    },
    FETCH_ADMIN_NOTFOUND(state) {
      state.searchFound = false;
    },
    IS_FETCHING_LOANHISTORY(state,status){
      state.isFetchingLoanHistory=status
    },
    FETCH_LOANHISTORY_SUCCESS(state,data){
      state.loanHistory=data
    },
    SEARCH_REQUESTS_NOTFOUND(state) {
      state.searchFound = false;
    },
    SEARCH_REQUESTS_FOUND(state, data) {
      (state.searchTerm = ""), (state.searchFound = true);
      state.loanRequests = { ...data };
    },
    UPDATE_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    UPDATE_SEARCH_FOUND(state, status) {
      state.searchFound = status;
    },
    SPILT_DETAILS(state) {
      const loanData = state.loanDetails;
      const format=(num)=>{
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
      state.splitDetails.customerName = loanData.user.full_name;
      state.splitDetails.offerId = loanData.offer.id;
      //const userData=state.$route.params.userData
      state.splitDetails.firstRowBio = [
        { name: "IPPIS Number", value: loanData.user.user_name },
        { name: "Phone Number", value: loanData.user.profile.mobile_number },
        { name: "Marital Status", value: loanData.user.profile.marital_status },
        { name: "Monthly Salary", value: loanData.user.profile.monthly_salary },
      ];
      state.splitDetails.secondRowBio = [
        { name: "MDA", value: loanData.user.profile.mda },
        { name: "Gender", value: loanData.user.profile.gender },
        { name: "BVN", value: loanData.user.profile.bvn },
        { name: "Email", value: loanData.user.email },
      ];
      state.splitDetails.thirdRowBio = [
        { name: "Religion", value: loanData.user.profile.religion },
        { name: "State Of Origin", value: loanData.user.profile.state },
        { name: "Nationality", value: loanData.user.profile.nationality },
        { name: "Address", value: loanData.user.profile.address },
      ];
      state.splitDetails.loanDetailsRowOne = [
        { name: "Date Requested", value: loanData.date },
        { name: "Loan Offer", value: loanData.offer.title },
        { name: "Amount", value: format(loanData.amount) },
        {
          name: "Repayment Period",
          value: loanData.offer.payback_period + " Months",
        },
        {
          name: "First Repayment Date",
          value: loanData.offer.moratorium_period + " months after",
        },
        { name: "Interest Rate", value: `${loanData.offer.interest_rate}%` },
      ];
      state.splitDetails.loanDetailsRowTwo = [{}];
      state.splitDetails.loanHistory = loanData.user.loan_history;
    },
  },
  actions: {
    requestsSummary({ commit }) {
      commit("FETCHING_SUMMARY", true);
      admin.requestsSummary().then((response) => {
        commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data);
        commit("FETCHING_SUMMARY", false);
      });
    },
    fetchAdminLoanRequests({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      admin.fetchAdminLoanRequests(query).then((response) => {
        commit("IS_FETCHING_LOANREQUEST", false);
        if (response.data.data.length === 0) {
          commit("FETCH_ADMIN_NOTFOUND");
        } else {
          commit("FETCH_ADMIN_FOUND", response.data);
        }
      });
    },
    fetchAdminLoanRequestsDetials({ commit }, requestId) {
      commit("IS_FETCHING_LOANDETAILS", true);
      return new Promise((resolve, reject) => {
        admin.fetchAdminLoanRequestsDetails(requestId).then((res) => {
          commit("IS_FETCHING_LOANDETAILS", false);
          commit("FETCH_LOANDETAILS_SUCCESS", res.data.data);
          commit("SPILT_DETAILS",res.data.data);
          resolve()
        }).catch(err=>{
          err
          reject()
        })
      })
      
    },
    fetchAdminLoanHistory({commit},requestId){
      commit("IS_FETCHING_LOANHISTORY",true)
      admin.fetchAdminLoanHistory(requestId).then((response)=>{
        commit("IS_FETCHING_LOANHISTORY",false)
        commit("FETCH_LOANHISTORY_SUCCESS",response.data)
      })
    },
    AdminSearchLoanRequest({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      admin.adminSearchLoanRequest(query)
        .then((response) => {
          commit("IS_FETCHING_LOANREQUEST", false);
          if (response.data.data.length === 0) {
            commit("SEARCH_REQUESTS_NOTFOUND");
          } else {
            commit("SEARCH_REQUESTS_FOUND", response.data);
          }
        });
    },
    updateSearchTerm({ commit }, searchTerm) {
      commit("UPDATE_SEARCH_TERM", searchTerm);
    },
    updateSearchFound({ commit }, status) {
      commit("UPDATE_SEARCH_FOUND", status);
    },
  },
};
