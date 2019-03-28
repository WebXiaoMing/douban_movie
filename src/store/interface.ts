
export type Field = 'hot'

// 缓存对象数据
export interface ListProps {
   invalidateTime: number     // 过期时间
   items: any          // 数据列表
   start: number              // 从start开始请求数据
   count: number
   hasMore: boolean           // 是否还有更多
   method: any                // 请求方法
}

//  初始State
export interface DefaultStateProps {
   hot: ListProps
   rank: ListProps
}

// Action的
export interface ActionProps {
   type: string
   field: Field
   payload: any
}

export interface ResponseProps {
   total: number
   subjects: Array<any>
}