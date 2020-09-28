import axios from "axios";
import { getUrlPath } from "../../../../helpers/getPath";

export const signIn = async ({ commit, dispatch }, { credentials }) => {
  commit("SET_VALIDATION_ERROR", [], { root: true });
  commit("SET_ERROR_MESSAGE", null);
  commit("IS_LOGGING_USER_IN", true);

  try {
    let response = await axios.post(`${getUrlPath()}/login`, credentials);
    return dispatch("attempt", response.data.data.access_token);
  } catch (e) {
    commit("SET_ERROR_MESSAGE", e.response.data.message);
    commit("IS_LOGGING_USER_IN", false);
    return Promise.reject(e);
  }
};

export const attempt = async ({ commit, state }, access_token) => {
  if (access_token) {
    commit("SET_TOKEN", access_token);
  }
  if (!state.access_token) {
    return;
  }
  if (!getUrlPath()) {
    return;
  }
  try {
    let response = await axios.get(`${getUrlPath()}/dashboard`);
    commit("IS_LOGGING_USER_IN", false);
    commit("SET_USER", response.data);
  } catch (e) {
    commit("SET_TOKEN", null);
    commit("SET_USER", null);
  }
};

export const clearOneError = ({ commit }) => {
  commit("IS_LOGGING_USER_IN", false);
};

export const sendResetPasswordEmail = async ({ commit }, form) => {
  commit("SENDING_PASSWORD_RESET_EMAIL", true);
  let response = await axios.post("user/password/forgot", form);
  commit("SENDING_PASSWORD_RESET_EMAIL", false);
  return response;
};

export const resetPassword = async ({ commit }, form) => {
  commit("RESETTING_PASSWORD", true);
  try {
    const response = await axios.post("user/password/resetPassword", form);
    commit("RESETTING_PASSWORD", false);
    return response;
  } catch (e) {
    commit("RESETTING_PASSWORD", false);
    return Promise.reject(e);
  }
};

export const logout = async ({ commit }) => {
  let response = await axios.post("user/logout");
  commit("SET_TOKEN", null);
  commit("SET_USER", null);
  return response;
};


