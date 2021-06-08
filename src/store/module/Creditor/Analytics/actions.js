import creditor from "../../../Api/creditor";

export const getLoanProcessedAndRequestPercent = async ({ commit }, date) => {
  try {
    const response = await creditor.getLoanProcessedAndRequestPercent(date);
    commit("LOAN_REQUEST_PERCENT", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getRegisteredMdas = async ({ commit }, date) => {
  try {
    const response = await creditor.getRegisteredMda(date);
    commit("REGISTERED_MDAS", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const repaymentByMda = async ({ commit }, data) => {
  try {
    const response = await creditor.repaymentPerMda(data);
    commit("REPAYMENT_PER_MDA", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const countsByLoanOffer = async (
  { commit },
  { offerId, year, date }
) => {
  try {
    const response = await creditor.countsByLoanOffer(offerId, year, date);
    commit("COUNTS_PER_LOAN_OFFER", response.data);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
