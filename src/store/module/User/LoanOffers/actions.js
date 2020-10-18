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