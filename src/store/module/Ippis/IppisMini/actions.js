import ippis from "../../../Api/ippis"

export const getTransactionalRecords = async ({ commit }, query) => {
  try {
    const response = await ippis.getTransactionalRecords(query);
    const master = await ippis.checkMasterRecords(500433);
    console.log(master)
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


/* export const checkMasterRecord =({ commit }, ippis) => {
  commit("CHECK_MASTER_RECORDS", "hbjk");
  ippis.checkMasterRecords(ippis)
  console.log(ippis)
  ippis.checkMasterRecord(ippis).then(response=>{
    console.log(response)
    commit("CHECK_MASTER_RECORDS",response);
  })
}; */
