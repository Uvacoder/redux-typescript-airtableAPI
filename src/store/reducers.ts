// store/session/reducers.ts
import { combineReducers } from 'redux'
import { Action } from './actions'

// States' definition
export interface IClasses {
  isFetching: boolean
  accessToken?: string
}

export interface State {
  accessToken: IClasses
}

const accessToken = (state: IClasses = { isFetching: false }, action: Action): IClasses => {

  switch (action.type) {
    case 'GET_CLASSES':
      return { ...state, accessToken: action.accessToken }

    case 'SET_FETCHING':
      return { ...state, isFetching: action.isFetching }
  }
  return state
}
export default combineReducers<State>({
  accessToken
})