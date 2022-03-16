
const defaultState = {
    isMoving: false,
  };
  
  const SET_MOVING = "SET_MOVING"
  const SET_STOP = "SET_STOP"
  
  export const isMovingReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "SET_MOVING":
        return {isMoving: true};
      case "SET_STOP":
        return {isMoving: false};
  
      default:
        return state;
    }
  };
  
  export const moveAction = () => ({type: SET_MOVING})
  export const stopAction = () => ({type: SET_STOP})
  