import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getClassesList } from '../API'

// Action Definition
export interface GetClassesAction {
  type: 'GET_CLASSES'
  accessToken: string
}
export interface SetFetcing {
  type: 'SET_FETCHING'
  isFetching: boolean
}

// Union Action Types
export type Action = GetClassesAction | SetFetcing

// Action Creators
export const set = (accessToken: string): GetClassesAction => {
  return { type: 'GET_CLASSES', accessToken }
}
export const isFetching = (isFetching: boolean): SetFetcing => {
  return { type: 'SET_FETCHING', isFetching }
}

// thunk action
export const login = (student_name: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {

      dispatch(isFetching(true))
      
      getClassesList(student_name).then((res) => {
        
        dispatch(set('this_is_access_token'))
        
        dispatch(isFetching(false))
        
        console.log('get Data', res)

        resolve()
      })
    })
  }
}