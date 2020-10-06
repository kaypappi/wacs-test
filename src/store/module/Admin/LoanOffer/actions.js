import admin from "../../../Api/admin"



   export const fetchLoanOffers=({ commit }, query)=> {
      commit("IS_FETCHING_LOANOFFERS", true);
      admin.fetchLoanOffers(query).then((response) => {
        commit("IS_FETCHING_LOANOFFERS", false);
        if (response.data.data.length === 0) {
          commit("FETCH_LOANOFFERS_NOTFOUND");
        } else {
          commit("FETCH_LOANOFFERS_FOUND", response.data);
        }
      });
    }
   export const searchOffers=({ commit }, query) =>{
      commit("IS_FETCHING_LOANOFFERS", true);
      admin.searchOffers(query).then((response) => {
        commit("IS_FETCHING_LOANOFFERS", false);
        if (response.data.data.length === 0) {
          commit("SEARCH_LOANOFFERS_NOTFOUND");
        } else {
          commit("SEARCH_LOANOFFERS_FOUND", response.data);
        }
      });
    }
    export const updateSearchTerm=({ commit }, searchTerm) =>{
      commit("UPDATE_SEARCH_TERM", searchTerm);
    }
    export const updateSearchFound=({ commit }, status)=> {
      commit("UPDATE_SEARCH_FOUND", status);
    }

    export const updateLoanOffers=({ commit }, newRow)=> {
      commit("UPDATE_LOAN_OFFER", newRow);
    }
