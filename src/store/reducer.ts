import * as types from './types'
import { DefaultStateProps, ActionProps } from './interface'
import { updateMovieList } from '../utils/base'
import createRequestInstance from "../utils/axios"

const defaultState:DefaultStateProps = {
   hot: {
      invalidateTime: 0,
      items: [],
      start: 0,
      count: 20,
      hasMore: true,
      method: createRequestInstance('get', '/api/v2/movie/in_theaters')
   },
   rank: {
      invalidateTime: 0,
      items: [],
      start: 0,
      count: 20,
      hasMore: true,
      method: createRequestInstance('get', '/api/v2/movie/top250')
   }
}

const reducer = (state=defaultState, action:ActionProps) => {
   switch (action.type) {
      case types.UPDATE_DATA:
         return { ...state, [action.field]: updateMovieList(state[action.field], action.payload)}
      case types.REFRESH_DATA:
         return { ...state, [action.field]: updateMovieList(state[action.field], action.payload, true)}
      default:
         return state
   }
}

export default reducer