import ippis from "../../../Api/ippis";

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

export const checkMasterRecords = async ({ commit }, ippis) => {
  try {
    const response = await ippis.checkMasterRecords(ippis);
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
