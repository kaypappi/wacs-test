import ippis from "../../../Api/ippis"

export const getTransactionalRecords = async ({ commit }, query) => {
  try {
    const response = await ippis.getTransactionalRecords(query);
    commit("GET_TRANSACTION_RECORDS", response.data);
    return Promise.resolve(response.data);
  } catch (e) {
    const data = {
      title: "Error!",
      message: e.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(e);
  }
};

export const checkMasterRecord = async ({ commit }, ippisNumber) => {
  try {
    const response = await ippis.checkMasterRecords(ippisNumber);
    commit("CHECK_MASTER_RECORDS", response.data);
    return Promise.resolve(response.data);
  } catch (e) {
    const data = {
      title: "Error!",
      message: e.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(e);
  }
};


export const checkTransactionalRecord = async ({ commit }, {ippisNumber,query}) => {
  try {
    const response = await ippis.checkTransactonalRecords(ippisNumber,query);
    commit("CHECK_TRANSACTION_RECORDS", response.data);
    return Promise.resolve(response.data);
  } catch (e) {
    const data = {
      title: "Error!",
      message: e.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(e);
  }
};
