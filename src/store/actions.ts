import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getClassesList } from '../API'
import { IClass } from '../store/reducers'

// Action Definition
export interface GetClassesAction {
  type: 'GET_CLASSES'
  classListData: IClass[]
}
export interface SetFetching {
  type: 'SET_FETCHING'
  isFetching: boolean
}

// Union Action Types
export type Action = GetClassesAction | SetFetching

// Action Creators
export const getClassesData = (classListData: IClass[] | any): GetClassesAction => {
  return { type: 'GET_CLASSES', classListData: classListData }
}
export const isFetching = (isFetching: boolean): SetFetching => {
  return { type: 'SET_FETCHING', isFetching }
}

// thunk action
export const login = (student_name: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {

      dispatch(isFetching(true))
      
      getClassesList(student_name).then((res) => {
        dispatch(getClassesData(res))
        dispatch(isFetching(false))
        resolve()
      }) 
    })
  }
}

export const logout = (): ThunkAction<void, {}, {}, AnyAction> => {
  // Invoke API
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getClassesData(null))
  }
}