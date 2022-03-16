const defaultState = {
    pX: 0,
    pY: 0
  };

  const SET_CURRENT_COORD="SET_CURRENT_COORD"
  
  
  export const currentCoordReducer = (state = defaultState, action) => {
    switch (action.type) {
      case SET_CURRENT_COORD:
        return {pX: action.payload.pX, pY: action.payload.pY};
      default:
        return state;
    }
  };
  
  export const setCurrrentCoordAction = (pX, pY) => ({type: SET_CURRENT_COORD, payload: {pX, pY}})