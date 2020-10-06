import creditor from "../../../Api/creditor";
import { EventBus } from '@/event.js';

export const fetchAdmins = ({ commit }, page, query) => {
  //const link = page ? `creditor?page=${page}` : 'creditor';
  commit("IS_GETTING_ADMIN", true);
  creditor.fetchAdmins({ page, query }).then((res) => {
    commit("IS_GETTING_ADMIN", false);
    commit("FETCH_ADMIN_SUCCESS", res.data);
  });
};
export const createAdmin = ({ commit }, userData) => {
  commit("IS_POSTING_ADMIN", true);
  creditor
    .createAdmin(userData)
    .then(function(res) {
      commit("IS_POSTING_ADMIN", false);
      commit("CREATE_ADMIN_SUCCESS", res.data.data);
    })
    .catch(function() {
      commit("IS_POSTING_ADMIN", false);
    });
};
export const editAdmin = ({ commit }, userData) => {
  commit("IS_POSTING_ADMIN", true);

  creditor
    .editAdmin(userData)
    .then(function(res) {
      commit("IS_POSTING_ADMIN", false);
      commit("EDIT_ADMIN_SUCCESS", res.data.data);
    })
    .catch(function() {
      commit("IS_POSTING_ADMIN", false);
    });
};
export const resetPostingStatus = ({ commit }) => {
  commit("RESET_POST_ADMIN_STATUS");
};
export const updateUserStatus = ({ commit }, data) => {
  commit("UPDATE_USER_STATUS", {
    userId: data.id,
    newStatus: data.newStatus,
  });
};
export const fetchAdminRoles = ({ commit }) => {
  creditor.fetchAdminRoles().then((response) => {
    commit("UPDATE_ADMIN_ROLES", response.data);
  });
};

export const toggleUserStatus = ({ commit, dispatch }, id) => {
  creditor
    .toggleUserStatus(id)
    .then((data) => {
      const newStatus = data.data.data.status;
      commit("SET_TOGGLE_SUCCESS", true);
      EventBus.$emit("success", true);
      dispatch("AdminUser/updateUserStatus", { id, newStatus }, { root: true });
    })
    .catch(function() {
      EventBus.$emit("success", false);
    });
};

export const resetSuccess = ({ commit }) => {
  commit("SET_TOGGLE_SUCCESS", false);
};
