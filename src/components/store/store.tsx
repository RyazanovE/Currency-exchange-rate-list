import {createStore, combineReducers} from 'redux'
import { isEnterReducer } from './isEnterReducer'
import {coordReducer} from './coordReducer'
import { currentValuteReducer } from './currentValuteReducer';
import { currentCoordReducer } from './currentCoordReducer';

  export const rootReducer = combineReducers({
    isEnterReducer,
    coordReducer,
    currentValuteReducer,
    currentCoordReducer,
  });

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>