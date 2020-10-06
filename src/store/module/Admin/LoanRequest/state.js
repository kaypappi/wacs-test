export default {
  isFetchingLoanRequests: false,
  isFetchingLoanDetails: false,
  fetchingSummary: false,
  isFetchingLoanHistory: false,
  Loading: false,
  searchFound: true,
  loanRequests: [],
  loanDetails: {},
  loanHistory: [],
  requestsSummary: {
    total: 0,
    pending: 0,
    running: 0,
    bank_approved: 0,
    rejected: 0,
    awaiting_ippis: 0,
  },
  splitDetails: {
    offerId: "",
    customerName: "",
    firstRowBio: [],
    secondRowBio: [],
    thirdRowBio: [],
    loanDetailsRowOne: [],
    loanHistory: [],
  },
  searchTerm: "",
};
