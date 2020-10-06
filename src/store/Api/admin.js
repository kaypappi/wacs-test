import axios from "axios";

export default {
  fetchLoanOffers(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`admin/offers?${query}`)
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
        .get(`admin/offers/${query.search}/search`)
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
        .get("admin/requests/counts")
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAdminLoanRequests(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`admin/requests?${query}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAdminLoanRequestsDetails(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`admin/requests/${requestId}/view`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAdminLoanHistory(requestId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`admin/requests/${requestId}/history`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  adminSearchLoanRequest(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`admin/requests/${query.search}/search`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAdmins({ page, query, userType }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/users/${userType}`, {
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

  createAdmin({ userData, userType }){
    return new Promise((resolve, reject) => {
        axios
        .post(`admin/${userType}`, userData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
  },

  editAdmin({ userData, userType }){
    return new Promise((resolve, reject) => {
        axios
        .patch(`admin/${userType}/` + userData.userId, userData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
  },

  fetchCompanies({ page, query }){
    return new Promise((resolve, reject) => {
        axios
        .get("admin/companies", {
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

  createCompany(userData){
    return new Promise((resolve, reject) => {
        axios.post("admin/companies", userData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
  }
};
