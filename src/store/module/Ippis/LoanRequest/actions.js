 import ippis from  '../../../Api/ippis'
 
 export const fetchIppissLoanRequests=({ commit }, query)=> {
    commit("IS_FETCHING_LOANREQUEST", true);
    ippis.fetchIppisLoanRequests(query).then((response) => {
      commit("IS_FETCHING_LOANREQUEST", false);
      if (response.data.data.length === 0) {
        commit("FETCH_ADMIN_NOTFOUND");
      } else {
        commit("FETCH_ADMIN_FOUND", response.data);
      }
    });
  }
 export const  fetchIppisLoanRequestsDetials=({ commit }, requestId)=> {
    commit("IS_FETCHING_LOANDETAILS", true);
    return new Promise((resolve, reject) => {
      ippis
        .fetchIppisLoanRequestsDetails(requestId)
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
  }
 export const  fetchIppisLoanHistory=({ commit }, requestId) =>{
    commit("IS_FETCHING_LOANHISTORY", true);
    ippis.fetchIppisLoanHistory(requestId).then((response) => {
      commit("IS_FETCHING_LOANHISTORY", false);
      commit("FETCH_LOANHISTORY_SUCCESS", response.data);
    });
  }
 export const  splitDetails=({ commit })=> {
    commit("SPILT_DETAILS");
  }
 export const  ippisApproveRequest=async({ commit }, requestId)=> {
    const data = {
      id: requestId,
    };
    ippis
      .ippisApproveRequest(data)
      .then((response) => {
        commit("SHOW_TOAST", {
          title: "Successful",
          message: response.data.message,
          success: true,
        });
       return response
      })
      .catch((err) => {
        commit("SHOW_TOAST", {
          title: "Error",
          message: err.response.data.message,
          success: false,
        });
      });
  }
 export const  ippisDeclineRequest=({ commit }, requestId) =>{
    const data = {
      id: requestId,
    };
    ippis
      .ippisDeclineRequest(data)
      .then((response) => {
        commit("SHOW_TOAST", {
          title: "Successful",
          message: response.data.message,
          success: true,
        });
        return response
      })
      .catch((err) => {
        commit("SHOW_TOAST", {
          title: "Error",
          message: err.response.data.message,
          success: false,
        });
      });
  }
 export const  ippisSearchLoanRequest=({ commit }, query)=> {
    commit("IS_FETCHING_LOANREQUEST", true);
    ippis.ippisSearchLoanRequest(query).then((response) => {
      commit("IS_FETCHING_LOANREQUEST", false);
      if (response.data.data.length === 0) {
        commit("SEARCH_REQUESTS_NOTFOUND");
      } else {
        commit("SEARCH_REQUESTS_FOUND", response.data);
      }
    });
  }

 export const  updateSearchTerm=({ commit }, searchTerm)=> {
    commit("UPDATE_SEARCH_TERM", searchTerm);
  }
 export const  updateSearchFound=({ commit }, status)=> {
    commit("UPDATE_SEARCH_FOUND", status);
  }
 export const  requestsSummary=({ commit })=> {
    commit("FETCHING_SUMMARY", true);
    ippis.requestsSummary().then((response) => {
      commit("FETCH_REQUEST_SUMMARY_SUCCESS", response.data);
      commit("FETCHING_SUMMARY", false);
    });
  }