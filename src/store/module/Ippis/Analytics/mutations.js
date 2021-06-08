export const GET_DASHBOARD_COUNT = (state, data) => {
  state.dashboardCount = data;
};

export const GET_TOTAL_LOANS_PROCESSED = (state, data) => {
  state.totalLoansProcessed = data;
};

export const GET_GENDER_RATIO = (state, data) => {
  state.genderRatio = data;
};

export const GET_TOTAL_REPAYMENTS = (state, data) => {
  state.totalRepayments = data;
};

export const GET_APPROVED_LOAN_COUNT = (state, data) => {
  state.approvedLoanCount = data;
};
