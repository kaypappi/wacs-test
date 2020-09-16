
import admin from "../Api/admin";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    adminUsers: [],
    paginationData: {},
    isGettingAdmins: false,
    isPostingAdmin: false,
    postAdminSuccess: false,
    fetchingCompanies: false,
    companies: {},
    companiesPaginationData: {},
    postCompanySuccess: false,
  },
  mutations: {
    FETCH_ADMIN_SUCCESS(state, adminData) {
      state.adminUsers = adminData.data;
      state.paginationData = adminData.meta;
    },
    IS_GETTING_ADMIN(state, isgetting) {
      state.isGettingAdmins = isgetting;
    },
    IS_POSTING_ADMIN(state, isPosting) {
      state.error = {};
      state.isPostingAdmin = isPosting;
    },
    CREATE_ADMIN_SUCCESS(state, userData) {
      state.adminUsers.push(userData);
      state.postAdminSuccess = true;
    },
    EDIT_ADMIN_SUCCESS(state, data) {
      const targetIdex = state.adminUsers.findIndex(
        (user) => user.id === data.id
      );
      Vue.set(state.adminUsers, state.adminUsers[targetIdex], data);
      state.adminUsers[targetIdex] = data;
      state.postAdminSuccess = true;
    },
    RESET_POST_ADMIN_STATUS(state) {
      state.postAdminSuccess = false;
    },
    UPDATE_USER_STATUS(state, data) {
      const targetIdex = state.adminUsers.findIndex(
        (user) => user.id === data.userId
      );
      state.adminUsers[targetIdex].status = data.newStatus;
    },
    FETCHING_COMPANIES(state, status) {
      state.fetchingCompanies = status;
    },
    FETCH_COMPANIES_SUCCESS(state, companies) {
      state.companies = companies.data;
      state.companiesPaginationData = companies.meta;
    },
    CREATING_COMPANY(state, status) {
      state.creatingCompany = status;
    },
    CREATE_COMPANY_SUCCESS(state, newCompany) {
      state.companies.push(newCompany);
      state.postCompanySuccess = true;
    },
  },
  actions: {
    fetchAdmins({ commit }, { page, query, userType }) {
      //const link = page ? `creditor?page=${page}` : 'creditor';
      commit("IS_GETTING_ADMIN", true);

      admin.fetchAdmins({ page, query, userType }).then((res) => {
        commit("IS_GETTING_ADMIN", false);
        commit("FETCH_ADMIN_SUCCESS", res.data);
      });
    },
    createAdmin({ commit }, { userData, userType }) {
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
    },
    editAdmin({ commit }, { userData, userType }) {
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
    },
    fetchCompanies({ commit }, { page, query }) {
      commit("FETCHING_COMPANIES", true);

      admin.fetchCompanies({ page, query }).then((response) => {
        commit("FETCH_COMPANIES_SUCCESS", response.data);
        commit("FETCHING_COMPANIES", false);
      });
    },
    createCompany({ commit }, userData) {
      commit("CREATING_COMPANY", true);
      admin.createAdmin(userData).then((response) => {
        commit("CREATE_COMPANY_SUCCESS", response.data.data);
        commit("CREATING_COMPANY", false);
      });
    },
    resetPostingStatus({ commit }) {
      commit("RESET_POST_ADMIN_STATUS");
    },
    updateUserStatus({ commit }, data) {
      commit("UPDATE_USER_STATUS", {
        userId: data.id,
        newStatus: data.newStatus,
      });
    },
  },
};
