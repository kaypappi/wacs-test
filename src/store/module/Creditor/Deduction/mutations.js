export const IS_FETCHING_ITEM=(state,status)=>{
    state.fetchingItem=status
}

export const FETCH_BATCH_ITEM_SUCCESS=(state,data)=>{
    state.batchItem=data
}