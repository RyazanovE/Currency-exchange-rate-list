import {createStore, combineReducers} from 'redux'
import { isEnterReducer } from './isEnterReducer'
import {coordReducer} from './coordReducer'
import { currentValuteReducer } from './currentValuteReducer';

  export const rootReducer = combineReducers({
    isEnterReducer,
    coordReducer,
    currentValuteReducer,
  });

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>