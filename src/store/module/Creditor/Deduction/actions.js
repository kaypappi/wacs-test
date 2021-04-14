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

export const fetchUploadedBatchItem = async ({ commit }, batchId) => {
  commit("IS_FETCHING_ITEM", true);
  try {
    const response = await creditor.fetchUploadedBatchItem(batchId);
    commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
    commit("IS_FETCHING_ITEM", false);
    return Promise.resolve(response.data);
  } catch (e) {
    commit("IS_FETCHING_ITEM", false);
    return Promise.reject(e);
  }
};

export const saveBatchSchedule = async ({ commit }, batchId) => {
  commit("SAVING_BATCH_SCHEDULE", true);
  try {
    const response =await creditor.saveUploadedBatchItem(batchId);
    commit("SAVING_BATCH_SCHEDULE", false,{root:true});
    const data = {
      title: "Successful!",
      message: response.data.message,
      success:true
    };
    commit("SHOW_TOAST", data);
    return Promise.resolve(response);
    
  } catch (e) {
    commit("SAVING_BATCH_SCHEDULE", false);
    const data = {
      title: "Error!",
      message: response.data.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data);
    return Promise.reject(e);
  }
};
