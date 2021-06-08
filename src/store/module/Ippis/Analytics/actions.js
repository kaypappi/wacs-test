import ippis from "../../../Api/ippis";

export const getDashboardCounts = async ({ commit }) => {
  try {
    const response = await ippis.getDashboardCounts();
    commit("GET_DASHBOARD_COUNT", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    Promise.reject(err);
  }
};

export const getTotalLoansProcessed = async ({ commit },data) => {
  try {
    const response = await ippis.getTotalLoansProcessed(data);
    commit("GET_TOTAL_LOANS_PROCESSED", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    Promise.reject(err);
  }
};

export const getGenderRatio = async ({ commit }, date) => {
  try {
    const response = await ippis.getGenderRatio(date);
    commit("GET_GENDER_RATIO", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    Promise.reject(err);
  }
};

export const getTotalRepayments = async ({ commit }, data) => {
  try {
    const response = await ippis.getTotalRepayments(data);
    commit("GET_TOTAL_REPAYMENTS", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    Promise.reject(err);
  }
};

export const getApprovedLoanCount = async ({ commit }, data) => {
  try {
    const response = await ippis.getApprovedLoanCount(data);
    commit("GET_APPROVED_LOAN_COUNT", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    Promise.reject(err);
  }
};
