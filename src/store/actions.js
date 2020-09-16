export const setValidationErrors=({ commit }, errors)=>{
    commit('SET_VALIDATION_ERROR', errors.errors);
  }

 export const  clearAllValidationErrors=({ commit })=>{
    commit('SET_VALIDATION_ERROR', [])
  }
 export const  clearOneValidationError=({ commit }, field)=>{
    commit('CLEAR_ONE_VALIDATION_ERROR', field)
  }