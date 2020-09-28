import user from "../../../Api/user";

export const CreateUserAccount = async ({ commit }, form) => {
  commit("CREATING_USER", true);
  try {
    const response = await user.createUserAccount(form);
    const userData = { ...response.data, password: form.password };
    commit("CREATE_USER_SUCCESS", userData);
    commit("CREATING_USER", false);
    return response;
  } catch (e) {
    commit("CREATING_USER", false);
    return Promise.reject(e);
  }
};

export const ValidateCode = async ({ commit }, form) => {
  commit("VALIDATING_CODE", true);
  try{
    const response = await user.validateCode(form);
    commit("VALIDATE_CODE_SUCCESS", response.data);
    commit("VALIDATING_CODE", false);
    return response;
  }catch(e){
    commit("VALIDATING_CODE", false);
    return Promise.reject(e);
  }
};

export const CompleteAccountCreation = async ({ commit, dispatch }, form) => {
  commit("COMPLETING_ACCOUNT_CREATION", true);
  try {
    const response = await user.completeAccountCreation(form);
    commit("COMPLETING_ACCOUNT_CREATION", false);
    return dispatch("Auth/attempt", response.data.data.access_token, {
      root: true,
    });
  } catch (e) {
    commit("SET_ERROR_MESSAGE", e.response.data.message);
    commit("COMPLETING_ACCOUNT_CREATION", false);
    return Promise.reject(e);
  }
};

export const ResendToken = async ({ commit }, form) => {
  try {
    const response = await user.resendToken(form);
    commit("RESET_TOKEN_SUCCESS");
    return response;
  }catch(e){
    console.log(e.response)
    return Promise.reject(e.response.data.message);
  }
};
