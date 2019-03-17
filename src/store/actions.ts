
import { Field } from './interface'
import * as types from './types'
import { Dispatch } from "redux"

export const updateData = (field:Field, newData:{total: number, subjects: Array<any>}) => {
   return {
      type: types.UPDATE_DATA,
      field,
      payload: newData
   }
}

export const refreshData = (field:Field, newData:{total: number, subjects: Array<any>}) => {
   return {
      type: types.REFRESH_DATA,
      field,
      payload: newData
   }
}

// 获取数据并派发数据更新actions
export const getMovieList = (field:Field, params:any, refresh:boolean = false) => {
   return (dispatch:Dispatch, getState:any) => {
      const { method } = getState()[field],
            action = refresh ? refreshData : updateData
      method(params).then((res:any) => dispatch(action(field, res)))
   }
}