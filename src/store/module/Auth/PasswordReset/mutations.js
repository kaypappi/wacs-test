export const IS_POSTING = (state, bool) => {
    state.isLoading = bool;
  };
  export const RESET_SUCCESS = (state, bool) => {
    state.resetSuccess = bool;
  };
  export const SET_INVALID_TOKEN = (state) => {
    state.tokenIsInvalid = true;
  };
  export const SET_VALID_TOKEN = (state) => {
    state.tokenIsValid = true;
  };
  export const SET_ERROR_MESSAGE = (state, error) => {
    state.error = error;
  };