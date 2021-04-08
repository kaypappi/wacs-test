export const SCHEDULE_UPLOAD_SUCCESS=(state,data)=>{
    state.currentBatchFile=data
}

export const IS_FETCHING_ITEM=(state,status)=>{
    state.fetchingItem=status
}

export const FETCH_BATCH_ITEM_SUCCESS=(state,data)=>{
    state.batchItem=data
}

export const SAVE_FILE_TO_STATE=(state,file)=>{
    state.scheduleFile=file
}
