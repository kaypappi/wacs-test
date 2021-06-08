import axios from "axios";

export default {
  fetchIppisLoanRequests(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis?${query}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchIppisLoanRequestsDetails(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/${requestId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchIppisLoanHistory(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/ippis/history/${requestId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  ippisApproveRequest(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/ippis/${data.id}/approve`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  ippisDeclineRequest(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/ippis/${data.id}/decline`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  ippisSearchLoanRequest(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/ippis/search/${query.search}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  requestsSummary() {
    return new Promise((resolve, reject) => {
      axios
        .get("creditor/request/totals")
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createMiniIppis(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/ippis`, user)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllIppis() {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/users`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getTransactionalRecords(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/transactional-records`, { params: query })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  checkMasterRecords(ippis) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/masters/${ippis}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  checkTransactonalRecords(ippis, query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/transactionals/${ippis}`, { params: query })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getDashboardCounts() {
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/analytics`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getTotalLoansProcessed(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`ippis/analytics/loans-processed`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGenderRatio(date) {
    return new Promise((resolve, reject) => {
      axios
        .post(`ippis/analytics/gender-ratio`, date)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTotalRepayments(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`ippis/analytics/repayments`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getApprovedLoanCount(data){
    return new Promise((resolve, reject) => {
      axios
        .post(`ippis/analytics/loans-count`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
