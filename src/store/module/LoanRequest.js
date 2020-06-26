import axios from "axios";
import router from "../../router/index"

export default {
  namespaced: true,
  errors:{},
  state: {
    isFetchingLoanRequests: false,
    isFetchingLoanDetails: false,
    fetchingSummary:false,
    isFetchingLoanHistory:false,
    Loading: false,
    searchFound: true,
    loanRequests: [],
    loanDetails: {},
    requestsSummary:{
      total:0,
      pending:0,
      approved:0,
      rejected:0
    },
    toast: {
      show: false,
      title: "",
      message: "",
      success: false,
    },
    splitDetails: {
      offerId: "",
      customerName: "",
      firstRowBio: [],
      secondRowBio: [],
      thirdRowBio: [],
      loanDetailsRow: [],
      loanHistory: [],
    },
    searchTerm: "",
  },
  getters: {
    isFetching(state) {
      return state.isFetchingLoanRequests;
    },
    searchFound(state) {
      return state.searchFound;
    },
    loanRequests(state) {
      return state.loanRequests;
    },
  },
  mutations: {
    IS_FETCHING_LOANREQUEST(state, isFetching) {
      state.isFetchingLoanRequests = isFetching;
    },
    IS_FETCHING_LOANDETAILS(state, status) {
      state.isFetchingLoanDetails = status;
    },
    IS_FETCHING_LOANHISTORY(state,status){
      state.isFetchingLoanHistory=status
    },
    IS_MAKING_OFFER(state, status) {
      state.Loading = status;
    },
    FETCH_ADMIN_FOUND(state, data) {
      state.loanRequests = { ...data };
      state.searchFound = true;
    },
    FETCH_ADMIN_NOTFOUND(state) {
      state.searchFound = false;
    },
    UPDATE_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    UPDATE_SEARCH_FOUND(state, status) {
      state.searchFound = status;
    },
    SEARCH_REQUESTS_NOTFOUND(state) {
      state.searchFound = false;
    },
    SEARCH_REQUESTS_FOUND(state, data) {
      (state.searchTerm = ""), (state.searchFound = true);
      state.loanRequests = { ...data };
    },
    FETCH_LOANDETAILS_SUCCESS(state, data) {
      state.loanDetails = { ...data };
    },
    SHOW_TOAST(state, title, message, success) {
      state.toast = { show: true, title, message, success };
    },
    REDIRECT(state,name,time=0){
      setTimeout(() => {
        router.push({ name });
      }, time);
    },
    SPILT_DETAILS(state) {
      const loanData = state.loanDetails;
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
        { name: "Requested Amount", value: loanData.amount },
        {
          name: "Repayment Period",
          value: loanData.offer.payback_period + " Months",
        },
        {
          name: "First Repayment Date",
          value: loanData.offer.moratorium_period + " months after",
        },
        { name: "Interest Rate", value: loanData.offer.interest_rate },
      ];
      state.splitDetails.loanDetailsRowTwo = [{}];
      state.splitDetails.loanHistory = loanData.user.loan_history;
    },
    APPROVE_REQUEST_ERROR(state, err) {
      state.aprrove_err = err;
    },
    FETCHING_SUMMARY(state,status){
      state.fetchingSummary=status
    },
    FETCH_REQUEST_SUMMARY_SUCCESS(state,data){
      state.requestsSummary={...data}
    }
  },
  actions: {
    fetchLoanRequests({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      axios.get(`/creditor/request/view?${query}`).then((response) => {
        commit("IS_FETCHING_LOANREQUEST", false);
        if (response.data.data.length === 0) {
          commit("FETCH_ADMIN_NOTFOUND");
        } else {
          commit("FETCH_ADMIN_FOUND", response.data);
        }
      });
    },
    declineLoanRequest({ commit }, id) {
      const data = { id };
      axios
        .post(`/creditor/request/decline`, data)
        .then((response) => {
          commit("SHOW_TOAST", "Successful", response.message, true);
          commit("REDIRECT","loanRequest",2000)
        })
        .catch((err) => {
          commit("SHOW_TOAST", "Successful", err.response.data.message, false);
        });
    },
    fetchIppissLoanRequests({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      axios.get(`creditor/request/ippis/view?${query}`).then((response) => {
        commit("IS_FETCHING_LOANREQUEST", false);
        if (response.data.data.length === 0) {
          commit("FETCH_ADMIN_NOTFOUND");
        } else {
          commit("FETCH_ADMIN_FOUND", response.data);
        }
      });
    },
    searchRequest({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      axios.get(`creditor/request/search/${query.search}`).then((response) => {
        commit("IS_FETCHING_LOANREQUEST", false);
        if (response.data.data.length === 0) {
          commit("SEARCH_REQUESTS_NOTFOUND");
        } else {
          commit("SEARCH_REQUESTS_FOUND", response.data);
        }
      });
    },
    fetchLoanRequestsDetials({ commit }, requestId) {
      commit("IS_FETCHING_LOANDETAILS", true);
      return new Promise((resolve, reject) => {
        axios.get(`creditor/request/view/${requestId}`).then((res) => {
  
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
    fetchLoanHistory({commit},requestId){
      commit("IS_FETCHING_LOANHISTORY",false)
      axios.get(`creditor/request/history/${requestId}`).then(()=>{
        commit("IS_FETCHING_LOANHISTORY",false)
    
      })
    },
    splitDetails({ commit }) {
      commit("SPILT_DETAILS");
    },
    ippisApproveRequest({ commit }, requestId) {
      const data = {
        id: requestId,
      };
      axios
        .post(`creditor/request/ippis/approve`, data)
        .then((response) => {
          commit("SHOW_TOAST", "Successful", response.data.message, true);
          commit("REDIRECT","ippisLoanRequest",2000)
        })
        .catch((err) => {
          commit("SHOW_TOAST", "Error", err.response.data.message, false);
        });
    },
    ippisDeclineRequest({ commit }, requestId) {
      const data = {
        id: requestId,
      };
      axios
        .post(`creditor/request/ippis/decline`, data)
        .then((response) => {
          commit("SHOW_TOAST", "Successful", response.data.message, true);
          commit("REDIRECT","ippisLoanRequest",2000)
        })
        .catch((err) => {
          commit("SHOW_TOAST", "Error", err.response.data.message, false);
        });
    },
    ippisSearchLoanRequest({ commit }, query) {
      commit("IS_FETCHING_LOANREQUEST", true);
      axios
        .get(`creditor/request/ippis/search/${query.search}`)
        .then((response) => {
          commit("IS_FETCHING_LOANREQUEST", false);
          if (response.data.data.length === 0) {
            commit("SEARCH_REQUESTS_NOTFOUND");
          } else {
            commit("SEARCH_REQUESTS_FOUND", response.data);
          }
        });
    },
    makeOffer({ commit }, data) {
      commit("IS_MAKING_OFFER", true);
      axios
        .post("creditor/repayments", data)
        .then((response) => {
          if (response.statusText === "Created") {
            commit("IS_MAKING_OFFER", false);
            commit("SHOW_TOAST", "Successful", "Successfully made offer", true);
            commit("REDIRECT","loanRequest",2000)
          }
        })
        .catch((err) => {
          commit("IS_MAKING_OFFER", false);
          commit("SHOW_TOAST", "Error", err.response.data.message, false);
        });
    },

    updateSearchTerm({ commit }, searchTerm) {
      commit("UPDATE_SEARCH_TERM", searchTerm);
    },
    updateSearchFound({ commit }, status) {
      commit("UPDATE_SEARCH_FOUND", status);
    },
    requestsSummary({commit}){
      commit("FETCHING_SUMMARY",true)
      axios.get("creditor/request/totals").then(response=>{
        commit("FETCH_REQUEST_SUMMARY_SUCCESS",response.data)
        commit("FETCHING_SUMMARY",false)
      })
    },
  },
};
