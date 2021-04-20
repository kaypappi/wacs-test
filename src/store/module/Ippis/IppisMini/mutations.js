export const GET_TRANSACTION_RECORDS=(state,data)=>{
    state.transactionalRecords=data
}

export const CHECK_TRANSACTION_RECORDS = (state, data) => {
  state.singleTransactionalRecords = data;
};

export const CHECK_MASTER_RECORDS=(state,data)=>{
    state.masterRecord=data
}