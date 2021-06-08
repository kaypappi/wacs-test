import creditor from "../../../Api/creditor";

export const fetchLoanOffers = async ({ commit }, query) => {
  try {
    commit("IS_FETCHING_LOANOFFERS", true);
    const response = await creditor.fetchLoanOffers(query);
    commit("IS_FETCHING_LOANOFFERS", false);
    if (response.data.data.length === 0) {
      commit("FETCH_LOANOFFERS_NOTFOUND");
    } else {
      commit("FETCH_LOANOFFERS_FOUND", response.data);
    }
    return Promise.resolve(response.data);
  } catch (err) {
    commit("IS_FETCHING_LOANOFFERS", false);
    return Promise.reject(err);
  }
};
export const searchOffers = ({ commit }, query) => {
  commit("IS_FETCHING_LOANOFFERS", true);
  creditor.searchOffers(query).then((response) => {
    commit("IS_FETCHING_LOANOFFERS", false);
    if (response.data.data.length === 0) {
      commit("SEARCH_LOANOFFERS_NOTFOUND");
    } else {
      commit("SEARCH_LOANOFFERS_FOUND", response.data);
    }
  });
};
export const updateSearchTerm = ({ commit }, searchTerm) => {
  commit("UPDATE_SEARCH_TERM", searchTerm);
};
export const updateSearchFound = ({ commit }, status) => {
  commit("UPDATE_SEARCH_FOUND", status);
};
export const createLoanOffer = async ({ commit, dispatch }, data) => {
  commit("CREATING_OFFER", true);
  creditor
    .createLoanOffer(data)
    .then((response) => {
      response;
      commit("CREATING_OFFER", false);
      commit("SHOW_TOAST", {
        title: "Successful!",
        message: "You created a loan offer",
        success: true,
      });
      dispatch("fetchLoanOffers");
    })
    .catch((err) => {
      commit("CREATING_OFFER", false);
      commit("SHOW_TOAST", {
        title: "Error!",
        message: err.response.data.message,
        success: false,
      });
    });
};
export const editLoanOffer = ({ commit }, { data, closeModal }) => {
  creditor
    .editLoanOffer(data)
    .then((response) => {
      commit("UPDATE_LOAN_OFFER", response.data.data);
      closeModal();
      commit("SHOW_TOAST", {
        title: "Successful",
        message: response.data.message,
        success: true,
      });
      // dispatch("fetchLoanOffers");
    })
    .catch((err) => {
      commit("SHOW_TOAST", {
        title: "Error",
        message: err.response.data.message,
        success: false,
      });
    });
};
export const updateLoanOffers = ({ commit }, newRow) => {
  commit("UPDATE_LOAN_OFFER", newRow);
};
export const deleteLoanOffer = ({ commit }, url, row) => {
  creditor
    .deleteLoanOffer(url)
    .then((response) => {
      commit("DELETE_LOANOFFER_ROW", row);
      commit("SHOW_TOAST", {
        title: "Successful!",
        message: response.data.message,
        success: true,
      });
    })
    .catch((err) => {
      commit("SHOW_TOAST", {
        title: "Error",
        message: err.response.data.message,
        success: false,
      });
    });
};
export const changeStatus = ({ commit }, url) => {
  creditor.changeStatus(url).then((response) => {
    commit("UPDATE_LOAN_OFFER", response.data.data);
  });
};
