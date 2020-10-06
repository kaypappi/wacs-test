import admin from "../../../Api/admin"

export const requestsSummary = ({ commit }) => {
  commit("FETCHING_SUMMARY", true);
  admin.requestsSummary().then((response) => {
    commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data);
    commit("FETCHING_SUMMARY", false);
  });
};
export const fetchAdminLoanRequests = ({ commit }, query) => {
  commit("IS_FETCHING_LOANREQUEST", true);
  admin.fetchAdminLoanRequests(query).then((response) => {
    commit("IS_FETCHING_LOANREQUEST", false);
    if (response.data.data.length === 0) {
      commit("FETCH_ADMIN_NOTFOUND");
    } else {
      commit("FETCH_ADMIN_FOUND", response.data);
    }
  });
};
export const fetchAdminLoanRequestsDetials = ({ commit }, requestId) => {
  commit("IS_FETCHING_LOANDETAILS", true);
  return new Promise((resolve, reject) => {
    admin
      .fetchAdminLoanRequestsDetails(requestId)
      .then((res) => {
        commit("IS_FETCHING_LOANDETAILS", false);
        commit("FETCH_LOANDETAILS_SUCCESS", res.data.data);
        commit("SPILT_DETAILS", res.data.data);
        resolve();
      })
      .catch((err) => {
        err;
        reject();
      });
  });
};
export const fetchAdminLoanHistory = ({ commit }, requestId) => {
  commit("IS_FETCHING_LOANHISTORY", true);
  admin.fetchAdminLoanHistory(requestId).then((response) => {
    commit("IS_FETCHING_LOANHISTORY", false);
    commit("FETCH_LOANHISTORY_SUCCESS", response.data);
  });
};
export const AdminSearchLoanRequest = ({ commit }, query) => {
  commit("IS_FETCHING_LOANREQUEST", true);
  admin.adminSearchLoanRequest(query).then((response) => {
    commit("IS_FETCHING_LOANREQUEST", false);
    if (response.data.data.length === 0) {
      commit("SEARCH_REQUESTS_NOTFOUND");
    } else {
      commit("SEARCH_REQUESTS_FOUND", response.data);
    }
  });
};
export const updateSearchTerm = ({ commit }, searchTerm) => {
  commit("UPDATE_SEARCH_TERM", searchTerm);
};
export const updateSearchFound = ({ commit }, status) => {
  commit("UPDATE_SEARCH_FOUND", status);
};
