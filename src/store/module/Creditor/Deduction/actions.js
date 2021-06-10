import creditor from "../../../Api/creditor";

export const uploadSchedule = async ({ commit }, { file, handleProgress }) => {
  try {
    const response = await creditor.uploadSchedule(file, handleProgress);
    commit("SAVE_FILE_TO_STATE", file);
    commit("SCHEDULE_UPLOAD_SUCCESS", response.data);
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchUploadedBatchItem = async (
  { commit },
  { batchId, query, type }
) => {
  commit("IS_FETCHING_ITEM", true);
  try {
    const response = await creditor.fetchUploadedBatchItem(
      batchId,
      query,
      type
    );
    switch (type) {
      case "scrap":
        commit("SCRAP", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      case "clean":
        commit("CLEAN", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      default:
        commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
    }
  } catch (e) {
    commit("IS_FETCHING_ITEM", false);
    return Promise.reject(e);
  }
};

export const fetchUploadedBatchItem2 = async (
  { commit },
  { batchId, query, type }
) => {
  commit("IS_FETCHING_ITEM", true);
  try {
    const response = await creditor.fetchUploadedBatchItem2(
      batchId,
      query,
      type
    );
    switch (type) {
      case "scrap":
        commit("SCRAP2", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      case "clean":
        commit("CLEAN2", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      default:
        commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
    }
  } catch (e) {
    commit("IS_FETCHING_ITEM", false);
    return Promise.reject(e);
  }
};

export const fetchUploadedBatchItemByIppis = async (
  { commit },
  { ippis, query, type }
) => {
  commit("IS_FETCHING_ITEM", true);
  try {
    const response = await creditor.fetchUploadedBatchItemByIppis(
      ippis,
      query,
      type
    );
    switch (type) {
      case "scrap":
        commit("SCRAP_IPPIS", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      case "clean":
        commit("CLEAN_IPPIS", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
      default:
        commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
        commit("IS_FETCHING_ITEM", false);
        return Promise.resolve(response.data);
    }
  } catch (e) {
    commit("IS_FETCHING_ITEM", false);
    return Promise.reject(e);
  }
};

export const fetchAllBatchItems = async ({ commit }, query) => {
  try {
    const response = await creditor.fetchAllBatchItems(query);
    commit("FETCH_ALL_BATCH_ITEMS", response.data);
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const saveBatchSchedule = async ({ commit }, batchId) => {
  try {
    const response = await creditor.saveUploadedBatchItem(batchId);
    const data = {
      title: "Successful!",
      message: response.data.message,
      success: true,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.resolve(response);
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

export const clearBatchSchedule = async ({ commit }, batchId) => {
  try {
    const response = await creditor.clearUploadedBatchItem(batchId);
    commit("CLEAR_CURRENT_BATCH_FILE");
    return response;
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

export const downloadScrapFile= async ({commit},batchId)=>{
  try {
    const response = await creditor.downloadScrapFile(batchId);
    commit("DOWNLOAD_SCRAP_FILE");
    const data = {
      title: "Success",
      message: "downloading scrap file",
      success: true,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.resolve(response);
  } catch (e) {
    const data = {
      title: "Error!",
      message: e.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(e);
  }
}
