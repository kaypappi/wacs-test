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
};
