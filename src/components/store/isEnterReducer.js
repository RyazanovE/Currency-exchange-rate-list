

const defaultState = {
  isEnter: false,
};

const EXIT = "EXIT"
const ENTER = "ENTER"

export const isEnterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "EXIT":
      return {isEnter: false };
    case "ENTER":
      return {isEnter: true };

    default:
      return state;
  }
};

export const EnterAction = (value) => ({type: ENTER})
export const ExitAction = (value) => ({type: EXIT})
