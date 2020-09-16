import router from "vue-router"

export const IS_FETCHING_LOANREQUEST = (state, isFetching) => {
  state.isFetchingLoanRequests = isFetching;
};
export const IS_FETCHING_LOANDETAILS = (state, status) => {
  state.isFetchingLoanDetails = status;
};
export const IS_FETCHING_LOANHISTORY = (state, status) => {
  state.isFetchingLoanHistory = status;
};
export const IS_MAKING_OFFER = (state, status) => {
  state.Loading = status;
};
export const FETCH_ADMIN_FOUND = (state, data) => {
  state.loanRequests = { ...data };
  state.searchFound = true;
};
export const FETCH_ADMIN_NOTFOUND = (state) => {
  state.searchFound = false;
};
export const UPDATE_SEARCH_TERM = (state, searchTerm) => {
  state.searchTerm = searchTerm;
};
export const UPDATE_SEARCH_FOUND = (state, status) => {
  state.searchFound = status;
};
export const SEARCH_REQUESTS_NOTFOUND = (state) => {
  state.searchFound = false;
};
export const SEARCH_REQUESTS_FOUND = (state, data) => {
  (state.searchTerm = ""), (state.searchFound = true);
  state.loanRequests = { ...data };
};
export const FETCH_LOANDETAILS_SUCCESS = (state, data) => {
  state.loanDetails = { ...data };
};
export const FETCH_LOANHISTORY_SUCCESS = (state, data) => {
  state.loanHistory = data;
};
export const SHOW_TOAST = (state, { title, message, success }) => {
  state.toast = { show: true, title, message, success };
  setTimeout(() => {
    state.toast.show = false;
  }, 2000);
};
export const REDIRECT = (state, { name, time = 0 }) => {
  setTimeout(() => {
    router.push({ name });
  }, time);
};
export const SPILT_DETAILS = (state) => {
  const loanData = state.loanDetails;
  const format = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  state.splitDetails.customerName = loanData.user.full_name;
  state.splitDetails.offerId = loanData.offer.id;
  //const userData=state.$route.params.userData
  state.splitDetails.firstRowBio = [
    { name: "IPPIS Number", value: loanData.user.user_name },
    { name: "Phone Number", value: loanData.user.profile.mobile_number },
    { name: "Marital Status", value: loanData.user.profile.marital_status },
    { name: "Monthly Salary", value: loanData.user.profile.monthly_salary },
  ];
  state.splitDetails.secondRowBio = [
    { name: "MDA", value: loanData.user.profile.mda },
    { name: "Gender", value: loanData.user.profile.gender },
    { name: "BVN", value: loanData.user.profile.bvn },
    { name: "Email", value: loanData.user.email },
  ];
  state.splitDetails.thirdRowBio = [
    { name: "Religion", value: loanData.user.profile.religion },
    { name: "State Of Origin", value: loanData.user.profile.state },
    { name: "Nationality", value: loanData.user.profile.nationality },
    { name: "Address", value: loanData.user.profile.address },
  ];
  state.splitDetails.loanDetailsRowOne = [
    { name: "Date Requested", value: loanData.date },
    { name: "Loan Offer", value: loanData.offer.title },
    {
      name: "Amount",
      value: format(loanData.loan_repayment_details.amount),
    },
    {
      name: "Repayment Period",
      value: loanData.offer.payback_period + " Months",
    },
    {
      name: "First Repayment Date",
      value: loanData.offer.moratorium_period + " months after",
    },
    { name: "Interest Rate", value: `${loanData.offer.interest_rate}%` },
  ];
  state.splitDetails.loanDetailsRowTwo = [{}];
  state.splitDetails.loanHistory = loanData.user.loan_history;
};
export const APPROVE_REQUEST_ERROR = (state, err) => {
  state.aprrove_err = err;
};
export const FETCHING_SUMMARY = (state, status) => {
  state.fetchingSummary = status;
};
export const FETCH_REQUEST_SUMMARY_SUCCESS = (state, data) => {
  state.requestsSummary = { ...data };
};
