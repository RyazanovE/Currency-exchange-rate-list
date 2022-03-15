
const defaultState = {
    pX: 0,
    pY: 0
  };

  const SET_COORD="SET_COORD"
  
  
  export const coordReducer = (state = defaultState, action) => {
    switch (action.type) {
      case SET_COORD:
        return {pX: action.payload.pX, pY: action.payload.pY};
      default:
        return state;
    }
  };
  
  export const setCoordAction = (pX, pY) => ({type: SET_COORD, payload: {pX, pY}})