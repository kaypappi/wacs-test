import Vue from "vue";

export const FETCH_ADMIN_SUCCESS = (state, adminData) => {
  state.adminUsers = adminData.data;
  state.paginationData = adminData.meta;
};
export const IS_GETTING_ADMIN = (state, isgetting) => {
  state.isGettingAdmins = isgetting;
};
export const IS_POSTING_ADMIN = (state, isPosting) => {
  state.error = {};
  state.isPostingAdmin = isPosting;
};
export const CREATE_ADMIN_SUCCESS = (state, userData) => {
  state.adminUsers.push(userData);
  state.postAdminSuccess = true;
};
export const EDIT_ADMIN_SUCCESS = (state, data) => {
  const targetIdex = state.adminUsers.findIndex((user) => user.id === data.id);
  Vue.set(state.adminUsers, state.adminUsers[targetIdex], data);
  state.adminUsers[targetIdex] = data;
  state.postAdminSuccess = true;
};
export const RESET_POST_ADMIN_STATUS = (state) => {
  state.postAdminSuccess = false;
};
export const UPDATE_USER_STATUS = (state, data) => {
  const targetIdex = state.adminUsers.findIndex(
    (user) => user.id === data.userId
  );
  state.adminUsers[targetIdex].status = data.newStatus;
};
export const UPDATE_ADMIN_ROLES = (state, data) => {
  state.adminRoles = data;
};

export const SET_TOKEN = (state, access_token) => {
  state.access_token = "Bearer" + " " + access_token;
};
export const SET_USER = (state, data) => {
  state.user = data;
};
export const IS_LOGGING_USER_IN = (state, bool) => {
  state.isLoading = bool;
};
export const SET_ERROR_MESSAGE = (state, error) => {
  state.loginError = error;
};
