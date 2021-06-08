export const SCHEDULE_UPLOAD_SUCCESS = (state, data) => {
  state.currentBatchFile = data;
};

export const IS_FETCHING_ITEM = (state, status) => {
  state.fetchingItem = status;
};

export const FETCH_BATCH_ITEM_SUCCESS = (state, data) => {
  state.batchItem = data;
};

export const SAVE_FILE_TO_STATE = (state, file) => {
  state.scheduleFile = file;
};

export const CLEAR_CURRENT_BATCH_FILE = (state) => {
  state.currentBatchFile = null;
};

export const FETCH_ALL_BATCH_ITEMS = (state, data) => {
  state.allBatchItems = data;
};

export const SCRAP = (state, data) => {
  const {
    total,
    to,
    current_page,
    first_page_url,
    from,
    last_page,
    last_page_url,
    next_page_url,
    path,
    per_page,
    prev_page_url,
  } = data;
  state.currentBatchFile = data.data[0]["file_staging"];
  data.data.map((item) => {
    if (item.error_occurred === 1) {
      if (state.failed[item.ippis_number]) {
        state.failed[item.ippis_number].breakdown = [
          ...state.failed[item.ippis_number].breakdown,
          item,
        ];
      } else {
        state.failed[item.ippis_number] = {
          total,
          to,
          current_page,
          first_page_url,
          from,
          last_page,
          last_page_url,
          next_page_url,
          path,
          per_page,
          prev_page_url,
        };
        state.failed[item.ippis_number].breakdown = [item];
      }
    }
  });
};

export const CLEAN = (state, data) => {
  const {
    total,
    to,
    current_page,
    first_page_url,
    from,
    last_page,
    last_page_url,
    next_page_url,
    path,
    per_page,
    prev_page_url,
  } = data;
  state.currentBatchFile=data.data[0]['file_staging']
  data.data.map((item) => {
    if (item.error_occurred === 0) {
      if (state.validated[item.ippis_number]) {
        state.validated[item.ippis_number].breakdown = [
          ...state.validated[item.ippis_number].breakdown,
          item,
        ];
      } else {
        state.validated[item.ippis_number] = {
          total,
          to,
          current_page,
          first_page_url,
          from,
          last_page,
          last_page_url,
          next_page_url,
          path,
          per_page,
          prev_page_url,
          
        };
        state.validated[item.ippis_number].breakdown = [item];
      }
    }
  });
};

export const SCRAP2 = (state, data) => {
  
  state.failed2=data
};

export const CLEAN2 = (state, data) => {
  
  state.validated2=data
};

export const SCRAP_IPPIS=(state,data)=>{
  
  state.validatedIppis=data
}

export const CLEAN_IPPIS = (state, data) => {
  state.failedIppis = data;
};
