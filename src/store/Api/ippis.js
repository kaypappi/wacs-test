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

  checkTransactonalRecords(ippis){
    return new Promise((resolve, reject) => {
      axios
        .get(`ippis/transactional/${ippis}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
