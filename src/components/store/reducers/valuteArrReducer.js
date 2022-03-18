

const defaultState = {
    valuteArr: []
  };

  const SET_VALUTE_ARR="SET_VALUTE_ARR"
  
  
  export const valuteArrReducer = (state = defaultState, action) => {
    switch (action.type) {
      case SET_VALUTE_ARR:
        return {valuteArr: action.payload};
      default:
        return state;
    }
  };
  
  export const setValuteArrAction = (Arr) => ({type: SET_VALUTE_ARR, payload: Arr})