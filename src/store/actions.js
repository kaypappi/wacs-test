export const setValidationErrors = ({ commit }, errors) => {
  commit("SET_VALIDATION_ERROR", errors.errors);
};

export const clearAllValidationErrors = ({ commit }) => {
  commit("SET_VALIDATION_ERROR", []);
};
export const clearOneValidationError = ({ commit }, field) => {
  commit("CLEAR_ONE_VALIDATION_ERROR", field);
};

export const addToast = ({ commit }, data) => {
  commit("ADD_TO_TOAST", data);
};

export const removeToast = ({ commit }, index) => {
  commit("REMOVE_ITEM_FROM_TOAST", index);
};
