
    export const SET_VALIDATION_ERROR =(state, errors)=> {
      state.validation = errors;
    }
    export const CLEAR_ONE_VALIDATION_ERROR =(state, field)=> {
      delete state.validation[field];
    }
