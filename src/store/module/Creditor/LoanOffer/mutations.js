export const IS_FETCHING_LOANOFFERS = (state, status) => {
  state.fetchingOffers = status;
};
export const UPDATE_SEARCH_TERM = (state, searchTerm) => {
  state.searchTerm = searchTerm;
};
export const UPDATE_SEARCH_FOUND = (state, status) => {
  state.searchFound = status;
};
export const FETCH_LOANOFFERS_NOTFOUND = (state) => {
  state.searchFound = false;
};
export const FETCH_LOANOFFERS_FOUND = (state, data) => {
  state.loanOffers = { ...data };
  state.searchTerm = "";
  state.searchFound = true;
};
export const SEARCH_LOANOFFERS_NOTFOUND = (state) => {
  state.searchFound = false;
};
export const SEARCH_LOANOFFERS_FOUND = (state, data) => {
  (state.searchTerm = ""), (state.searchFound = true);
  state.loanOffers = { ...data };
};
export const SHOW_TOAST = (state, { title, message, success }) => {
  state.toast = { show: true, title, message, success };
  setTimeout(() => {
    state.toast.show = false;
  }, 2000);
};
export const CREATING_OFFER = (state, status) => {
  state.creatingOffer = status;
};
export const DELETE_LOANOFFER_ROW = (state, row) => {
  const index = state.loanOffers.data.findIndex((x) => x.id === row);
  state.loanOffers.data.splice(index, 1);
};
export const UPDATE_LOAN_OFFER = (state, newRow) => {
  const index = state.loanOffers.data.findIndex((x) => x.id === newRow.id);
  state.loanOffers.data.splice(index, 1, newRow);
};
