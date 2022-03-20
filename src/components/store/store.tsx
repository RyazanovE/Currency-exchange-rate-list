import {createStore, combineReducers} from 'redux'
import { isEnterReducer } from './reducers/isEnterReducer'
import {coordReducer} from './reducers/coordReducer'
import { currentValuteReducer } from './reducers/currentValuteReducer';
import {isMovingReducer} from "./reducers/isMovingReducer"

  export const rootReducer = combineReducers({
    isEnterReducer,
    coordReducer,
    currentValuteReducer,
    isMovingReducer,
  });

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>