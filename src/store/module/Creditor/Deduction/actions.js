import creditor from "../../../Api/creditor";


export const uploadSchedule= async ({commit},{file,handleProgress})=>{
  try{
    const response = await creditor.uploadSchedule(file, handleProgress);
    commit("SCHEDULE_UPLOAD_SUCCESS", response.data);
    return Promise.resolve(response);
  }catch(e){
    return Promise.reject(e)
  }
}

export const fetchUploadedBatchItem = ({ commit }, batchId) => {
  commit("IS_FETCHING_ITEM", true);
  creditor.fetchUploadedBatchItem(batchId).then((response) => {
    commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
    commit("IS_FETCHING_ITEM", false);
  });
};

export const saveBatchSchedule=({commit},file)=>{
  commit("SAVING_BATCH_SCHEDULE",true)
  try{
    creditor.saveUploadedBatchItem(file).then((response) => {
      commit("SAVING_BATCH_SCHEDULE", false);
      return response;
    });
  }
  catch(e){
   commit("SAVING_BATCH_SCHEDULE", false);
   return Promise.reject(e)
  }
}
