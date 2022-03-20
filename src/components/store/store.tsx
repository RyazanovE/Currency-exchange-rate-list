import {createStore, combineReducers} from 'redux'
import { isEnterReducer } from './reducers/isEnterReducer'
import {coordReducer} from './reducers/coordReducer'
import { currentValuteReducer } from './reducers/currentValuteReducer';
import { currentCoordReducer } from './reducers/currentCoordReducer';
import {valuteArrReducer} from './reducers/valuteArrReducer'
import {isMovingReducer} from "./reducers/isMovingReducer"

  export const rootReducer = combineReducers({
    isEnterReducer,
    coordReducer,
    currentValuteReducer,
    currentCoordReducer,
    valuteArrReducer,
    isMovingReducer,
  });

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>