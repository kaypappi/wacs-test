export const CREATING_USER=(state,status)=>{
    state.creatingUser=status
}

export const CREATE_USER_SUCCESS=(state,userData)=>{
    state.userShortData=userData
}

export const VALIDATING_CODE=(state,status)=>{
    state.validatingCode = status;
}

export const VALIDATE_CODE_SUCCESS=(state,data)=>{
    state.userFullData=data
}

export const COMPLETING_ACCOUNT_CREATION=(state,status)=>{
    state.completingAccountCreation=status
}

export const SET_ERROR_MESSAGE = (state, error) => {
  state.signupError = error;
};