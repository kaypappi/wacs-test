import creditor from "../../../Api/creditor";

export const fetchUploadedBatchItem = ({ commit }, batchId) => {
  commit("IS_FETCHING_ITEM", true);
  creditor.fetchUploadedBatchItem(batchId).then((response) => {
    commit("FETCH_BATCH_ITEM_SUCCESS", response.data);
    commit("IS_FETCHING_ITEM", false);
  });
};
