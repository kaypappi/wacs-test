import creditor from "../../../Api/creditor"


export const fetchLoanRequests = ({ commit }, query) => {
  commit("IS_FETCHING_LOANREQUEST", true);
  creditor.fetchLoanRequests(query).then((response) => {
    commit("IS_FETCHING_LOANREQUEST", false);
    if (response.data.data.length === 0) {
      commit("FETCH_ADMIN_NOTFOUND");
    } else {
      commit("FETCH_ADMIN_FOUND", response.data);
    }
  });
};
export const declineLoanRequest = async ({ commit }, id) => {
  const data = { id };
  creditor
    .declineLoanRequest(data)
    .then((response) => {
      commit("SHOW_TOAST", {
        title: "Successful",
        message: response.message,
        success: true,
      });
      return response
    })
    .catch((err) => {
      commit("SHOW_TOAST", {
        title: "Successful",
        message: err.response.data.message,
        success: false,
      });
    });
};
/* export const fetchAdminLoanRequests = ({ commit }, query) => {
  commit("IS_FETCHING_LOANREQUEST", true);
  axios.get(`admin/requests?${query}`).then((response) => {
    commit("IS_FETCHING_LOANREQUEST", false);
    if (response.data.data.length === 0) {
      commit("FETCH_ADMIN_NOTFOUND");
    } else {
      commit("FETCH_ADMIN_FOUND", response.data);
    }
  });
}; */
export const searchRequest = ({ commit }, query) => {
  commit("IS_FETCHING_LOANREQUEST", true);
  creditor.searchRequest(query).then((response) => {
    commit("IS_FETCHING_LOANREQUEST", false);
    if (response.data.data.length === 0) {
      commit("SEARCH_REQUESTS_NOTFOUND");
    } else {
      commit("SEARCH_REQUESTS_FOUND", response.data);
    }
  });
};
export const fetchLoanRequestsDetials = ({ commit }, requestId) => {
  commit("IS_FETCHING_LOANDETAILS", true);
  return new Promise((resolve, reject) => {
    creditor
      .fetchLoanRequestsDetails(requestId)
      .then((res) => {
        commit("IS_FETCHING_LOANDETAILS", false);
        commit("FETCH_LOANDETAILS_SUCCESS", res.data.data);
        commit("SPILT_DETAILS", res.data.data);
        resolve(res);
      })
      .catch((err) => {
        err;
        reject(err);
      });
  });
};
export const fetchLoanHistory = ({ commit }, requestId) => {
  commit("IS_FETCHING_LOANHISTORY", true);
  creditor.fetchLoanHistory(requestId).then((response) => {
    commit("IS_FETCHING_LOANHISTORY", false);
    commit("FETCH_LOANHISTORY_SUCCESS", response.data);
  });
};
export const splitDetails = ({ commit }) => {
  commit("SPILT_DETAILS");
};
export const makeOffer = async({ commit }, data) => {
  commit("IS_MAKING_OFFER", true);
  creditor
    .makeOffer(data)
    .then((response) => {
      if (response.statusText === "Created") {
        commit("IS_MAKING_OFFER", false);
        commit("SHOW_TOAST", {
          title: "Successful",
          message: "Successfully made offer",
          success: true,
        });
       return response
      }
    })
    .catch((err) => {
      commit("IS_MAKING_OFFER", false);
      commit("SHOW_TOAST", {
        title: "Error",
        message: err.response.data.message,
        success: false,
      });
    });
};

export const getAllRepayments=({commit},query)=>{
  creditor.getAllRepayments(query).then(response=>{
    commit("FETCH_REPAYMENTS_SUCCESS",response.data)
  })
}

export const getSchedule= async({commit},{query,scheduleId})=>{
  try{
    const response = await creditor.getSchedule(query, scheduleId);
    commit("FETCH_SCHEDULE_SUCCESS", response.data);
    return response
  }catch(e){
   return Promise.reject(e)
  }
}

export const updateSearchTerm = ({ commit }, searchTerm) => {
  commit("UPDATE_SEARCH_TERM", searchTerm);
};
export const updateSearchFound = ({ commit }, status) => {
  commit("UPDATE_SEARCH_FOUND", status);
};
export const requestsSummary = ({ commit }) => {
  commit("FETCHING_SUMMARY", true);
  creditor.requestsSummary().then((response) => {
    commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data);
    commit("FETCHING_SUMMARY", false);
  });
};
