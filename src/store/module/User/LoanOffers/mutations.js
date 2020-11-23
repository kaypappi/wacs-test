export const FETCH_LOAN_OFFERS_SUCCESS = (state, data) => {
  state.loanOffers = data;
};

export const FETCHING_LOAN_OFFERS = (state, status) => {
  state.fetchingLoanOffers = status;
};

export const MAKING_LOAN_REQUEST=(state,status)=>{
  state.makingLoanRequest=status
}

export const MAKE_LOAN_REQUEST_ERROR=(state,error)=>{
  state.errors=error
}

export const FETCHING_LOAN_DETAILS=(state,status)=>{
  state.fetchingLoanDetails=status
}

export const FETCHING_LOANDETAILS_SUCCESS=(state,data)=>{
  state.loanDetails=data
}

export const ACCEPTING_LOAN_OFFER=(state,status)=>{
  state.acceptingLoanOffer=status
}

export const DECLINING_LOAN_OFFER = (state, status) => {
  state.decliningLoanOffer = status;
};