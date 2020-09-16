import admin from "../../../Api/admin"

export const fetchAdmins=({ commit }, { page, query, userType })=> {
    //const link = page ? `creditor?page=${page}` : 'creditor';
    commit("IS_GETTING_ADMIN", true);

    admin.fetchAdmins({ page, query, userType }).then((res) => {
      commit("IS_GETTING_ADMIN", false);
      commit("FETCH_ADMIN_SUCCESS", res.data);
    });
  }
  export const createAdmin=({ commit }, { userData, userType })=> {
    commit("IS_POSTING_ADMIN", true);

    admin
      .createAdmin({ userData, userType })
      .then(function(res) {
        commit("IS_POSTING_ADMIN", false);
        commit("CREATE_ADMIN_SUCCESS", res.data.data);
      })
      .catch(function() {
        commit("IS_POSTING_ADMIN", false);
      });
  }
  export const editAdmin=({ commit }, { userData, userType }) =>{
    commit("IS_POSTING_ADMIN", true);

    admin
      .editAdmin({ userData, userType })
      .then(function(res) {
        commit("IS_POSTING_ADMIN", false);
        commit("EDIT_ADMIN_SUCCESS", res.data.data);
      })
      .catch(function() {
        commit("IS_POSTING_ADMIN", false);
      });
  }
  export const fetchCompanies=({ commit }, { page, query })=> {
    commit("FETCHING_COMPANIES", true);

    admin.fetchCompanies({ page, query }).then((response) => {
      commit("FETCH_COMPANIES_SUCCESS", response.data);
      commit("FETCHING_COMPANIES", false);
    });
  }
  export const createCompany=({ commit }, userData) =>{
    commit("CREATING_COMPANY", true);
    admin.createAdmin(userData).then((response) => {
      commit("CREATE_COMPANY_SUCCESS", response.data.data);
      commit("CREATING_COMPANY", false);
    });
  }
  export const resetPostingStatus=({ commit }) =>{
    commit("RESET_POST_ADMIN_STATUS");
  }
  export const updateUserStatus=({ commit }, data) =>{
    commit("UPDATE_USER_STATUS", {
      userId: data.id,
      newStatus: data.newStatus,
    });
  }