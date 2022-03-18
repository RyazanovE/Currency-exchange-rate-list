
const defaultState = {
    isLoading: true,
  };
  
  const STOP_LOADING = "STOP_LOADING"
  const LOADING = "LOADING"
  
  export const isLoadingReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "STOP_LOADING":
        return {isLoading: false };
      case "LOADING":
        return {isLoading: true };
  
      default:
        return state;
    }
  };
  
  export const stopLoadingAction = () => ({type: STOP_LOADING})
  export const startLoadingAction = () => ({type: LOADING})
  