
    export const SET_VALIDATION_ERROR =(state, errors)=> {
      state.validation = errors;
    }
    export const CLEAR_ONE_VALIDATION_ERROR =(state, field)=> {
      delete state.validation[field];
    }
    export const  ADD_TO_TOAST=(state, data)=> {
    state.ToastArray.push(data)
  }

  export const SHOW_TOAST = (state, { title, message, success }) => {
    state.toast = { show: true, title, message, success };
    setTimeout(() => {
      state.toast.show = false;
    }, 2000);
  };
    export const REMOVE_ITEM_FROM_TOAST=(state, index)=> {
    const newToastArray = state.ToastArray
    newToastArray.splice(index, 1)
    state.ToastArray = newToastArray
  }
