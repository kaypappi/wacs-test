import axios from "axios";

export default {
  createUserAccount(form) {
    return new Promise((resolve, reject) => {
      axios
        .post("user/create", form)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  validateCode(form) {
    return new Promise((resolve, reject) => {
      axios
        .post("user/validatecode", form)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  completeAccountCreation(form) {
    return new Promise((resolve, reject) => {
      axios
        .post("user/completeaccount", form)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  resendToken(form) {
    return new Promise((resolve, reject) => {
      axios
        .post("user/resendcode", form)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },

  fetchLoanOffers(query) {
    return new Promise((resolve, reject) => {
      axios
        .get("user/filter", { params: query })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
  makeLoanRequest({ amount, id }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/loanRequest/${id}`, { amount })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
  fetchLoanDetails(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/loans/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
  acceptLoanOffer(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/loanRequest/accept/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
  declineLoanOffer(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/loanRequest/decline/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
};
