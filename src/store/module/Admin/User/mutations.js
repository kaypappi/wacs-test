import Vue from "vue"

export const FETCH_ADMIN_SUCCESS=(state, adminData) =>{
    state.adminUsers = adminData.data;
    state.paginationData = adminData.meta;
  }
  export const IS_GETTING_ADMIN=(state, isgetting) =>{
    state.isGettingAdmins = isgetting;
  }
  export const IS_POSTING_ADMIN=(state, isPosting)=> {
    state.error = {};
    state.isPostingAdmin = isPosting;
  }
 export const  CREATE_ADMIN_SUCCESS=(state, userData)=> {
    state.adminUsers.push(userData);
    state.postAdminSuccess = true;
  }
 export const  EDIT_ADMIN_SUCCESS=(state, data)=> {
    const targetIdex = state.adminUsers.findIndex(
      (user) => user.id === data.id
    );
    Vue.set(state.adminUsers, state.adminUsers[targetIdex], data);
    state.adminUsers[targetIdex] = data;
    state.postAdminSuccess = true;
  }
 export const  RESET_POST_ADMIN_STATUS=(state)=> {
    state.postAdminSuccess = false;
  }
  export const UPDATE_USER_STATUS =(state, data)=> {
    const targetIdex = state.adminUsers.findIndex(
      (user) => user.id === data.userId
    );
    state.adminUsers[targetIdex].status = data.newStatus;
  }
  export const FETCHING_COMPANIES=(state, status)=> {
    state.fetchingCompanies = status;
  }
  export const FETCH_COMPANIES_SUCCESS=(state, companies) =>{
    state.companies = companies.data;
    state.companiesPaginationData = companies.meta;
  }
  export const CREATING_COMPANY=(state, status)=> {
    state.creatingCompany = status;
  }
  export const CREATE_COMPANY_SUCCESS=(state, newCompany)=> {
    state.companies.push(newCompany);
    state.postCompanySuccess = true;
  }