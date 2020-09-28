export const authenticated = (state) => {
  return state.access_token && state.user;
};
export const isSuperAdmin = (state) => {
  return state.user.data.roles[0].name === "Super Admin";
};
export const isParkwayAdmin = (state) => {
  return state.user.data.roles[0].name === "Admin";
};
export const isIppisAdmin = (state) => {
  return state.user.data.roles[0].name === "IPPIS";
};
export const user = (state) => {
  return state.user;
};
export const isLoading = (state) => {
  return state.isLoading;
};
export const loginError = (state) => {
  return state.loginError;
};

export const sendingPasswordResetEmail = (state) => {
  return state.sendingPasswordResetEmail;
};

export const resettingPassword = (state) => {
  return state.resettingPassword;
};
