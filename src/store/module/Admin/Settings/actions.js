import admin from "../../../Api/admin";

export const getSettings = async ({ commit }) => {
  try {
    const response = await admin.getSettings();
    commit("GET_SETTINGS", response.data.data);
    return Promise.resolve(response.data.data);
  } catch (err) {
    const data = {
      title: "Error!",
      message: err.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(err);
  }
};

export const updateSetting = async ({ commit,dispatch }, setting) => {
  try {
    const response = await admin.updateSettings(setting);
    const data = {
      title: "Successful!",
      message: response.data.message,
      success: true,
    };
    commit("SHOW_TOAST", data, { root: true });
    dispatch("getSetting")
  } catch (err) {
    const data = {
      title: "Error!",
      message: err.response.data.message,
      success: false,
    };
    commit("SHOW_TOAST", data, { root: true });
    return Promise.reject(err);
  }
};
