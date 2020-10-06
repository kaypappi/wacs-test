import { EventBus } from '@/event.js';
import axios from "axios"

export const confirmToken = ({ commit }, token) => {
    axios
      .get("user/password/" + token)
      .then(() => {
        commit("SET_VALID_TOKEN");
      })
      .catch(function() {
        commit("SET_INVALID_TOKEN");
      });
  };
  export const resetPassword = ({ commit }, data) => {
    commit("IS_POSTING", true);
    axios
      .post("user/password/reset", data)
      .then(function() {
        commit("IS_POSTING", false);
        commit("RESET_SUCCESS", true);
      })
      .catch(function() {
        commit("IS_POSTING", false);
      });
  };
  export const changePassword = ({ commit }, data) => {
    commit("SET_ERROR_MESSAGE", null);
    commit("IS_POSTING", true);
    axios
      .post("user/password/change", data)
      .then(function() {
        commit("IS_POSTING", false);
        commit("RESET_SUCCESS", true);
      })
      .catch(function(err) {
        commit("SET_ERROR_MESSAGE", err.response.data.message);
        commit("IS_POSTING", false);
      });
  };
  export const sendPasswordResetLink = ({ commit }, data) => {
    commit("IS_POSTING", true);
    axios
      .post("user/password/forget", data)
      .then(function() {
        commit("IS_POSTING", false);
        commit("RESET_SUCCESS", true);
        EventBus.$emit("success", true);
      })
      .catch(function() {
        commit("IS_POSTING", false);
        EventBus.$emit("success", false);
      });
  };
  export const resetPasswordSuccess = ({ commit }) => {
    commit("RESET_SUCCESS", false);
  };
  