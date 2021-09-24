// store/session/reducers.ts
import { combineReducers } from 'redux'
import { Action } from './actions'

// States' definition
export interface IClass {
  name: string;
  students: string[];
};

export interface IClasses {
  isFetching: boolean;
  classList?: IClass[];
};
export interface State {
  classes: IClasses
}

const reducer = (state: IClasses = { isFetching: false }, action: Action): IClasses => {

  switch (action.type) {
    case 'GET_CLASSES':
      return { ...state, classList: action.classListData }

    case 'SET_FETCHING':
      return { ...state, isFetching: action.isFetching }
  }
  return state
}
export default combineReducers<State>({
  classes: reducer
})