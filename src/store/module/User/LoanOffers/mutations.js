export const FETCH_LOAN_OFFERS_SUCCESS = (state, data) => {
  state.loanOffers = data;
};

export const FETCHING_LOAN_OFFERS = (state, status) => {
  state.fetchingLoanOffers = status;
};
