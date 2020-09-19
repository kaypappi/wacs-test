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
};
