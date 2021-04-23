export const authenticated = (state) => {
  return state.access_token && state.user;
};
export const isSuperAdmin = (state) => {
  return state.user.data.roles[0].name.includes("Super Admin");
};
export const isParkwayAdmin = (state) => {
  return state.user.data.roles[0].name === "Admin";
};
export const isIppisAdmin = (state) => {
  return state.user.data.roles[0].name.includes("Ippis");
};
export const isIppisMini = (state) => {
  return state.user.data.roles[0].name === "Ippis Mini";
};
export const isStaff = (state) => {
  return state.user.data.user.roles[0].name === "Staff";
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
