import axios from "axios";

export default {
  fetchLoanOffers(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/offer/view`,{params:query})
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  searchOffers(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/offer/search/${query.search}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createLoanOffer(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`creditor/offer/create`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editLoanOffer(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`creditor/offer/update/${data.id}`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteLoanOffer(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  changeStatus(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchLoanRequests(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/creditor/request/view?${query}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  declineLoanRequest(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/creditor/request/decline/${data.id}`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  searchRequest(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/request/search/${query.search}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchLoanRequestsDetails(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/request/view/${requestId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchLoanHistory(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/request/history/${requestId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  makeOffer(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`creditor/repayments/${data.loan_request_id}`, data)
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

  fetchAdmins({ page, query }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/creditor", {
          params: {
            page,
            ...query,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createAdmin(userData) {
    return new Promise((resolve, reject) => {
      axios
        .post("creditor", userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editAdmin(userData) {
    return new Promise((resolve, reject) => {
      axios
        .patch("creditor/" + userData.userId, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAdminRoles() {
    return new Promise((resolve, reject) => {
      axios
        .get("/creditor/roles")
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  toggleUserStatus(id) {
    return new Promise((resolve, reject) => {
      axios
        .post("creditor/isactive/" + id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllRepayments(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/repayments/reports`, { params: query })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  getSchedule(query, scheduleId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`creditor/repayments/reports/${scheduleId}`, {
          params: query,
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },
};
