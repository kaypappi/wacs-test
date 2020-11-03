import user from  "../../../Api/user"

export const fetchLoanOffers=async({commit},query)=>{
    commit("FETCHING_LOAN_OFFERS",true)
    commit("FETCH_LOAN_OFFERS_SUCCESS", {data:[]});
    try{
        const response=await user.fetchLoanOffers(query)
        commit("FETCH_LOAN_OFFERS_SUCCESS",response.data)
        commit("FETCHING_LOAN_OFFERS", false);
        return response
    }
    catch(e){
        commit("FETCHING_LOAN_OFFERS", false);
        return Promise.reject(e)
    }
}

export const makeLoanRequest=async({commit},{amount,id})=>{
    commit("MAKING_LOAN_REQUEST",true)
    try{
        const response=await user.makeLoanRequest({amount,id})
        commit("MAKING_LOAN_REQUEST", false);
        return response
    }
    catch(e){
        commit("MAKE_LOAN_REQUEST_ERROR",e.errors)
        return Promise.reject(e)
    }
}