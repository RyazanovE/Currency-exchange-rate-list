const defaultState = {
    
  };

  const SET_VALUTE="SET_VALUTE"
  
  
  export const currentValuteReducer = (state = defaultState, action) => {
    switch (action.type) {
      case SET_VALUTE:
        return {...action.payload};
      default:
        return state;
    }
  };
  
  export const setValuteAction = (currentValute) => ({type: SET_VALUTE, payload: currentValute})