import React from 'react'
import ReactDOM from "react-dom";

import { ListView, PullToRefresh } from 'antd-mobile'

import MovieItem from "../MovieItem";
import { RouteComponentProps } from "react-router";
import { Field } from "../../store/interface";
import './index.scss'


export interface DefaultProps extends RouteComponentProps {
   getMovieList: (field: Field, params:any, refresh?:boolean) => any
   invalidateTime: number
   hasMore: boolean
   start: number
   count: number
   items: Array<any>
}

interface DefaultState {
   refreshing: boolean
   isLoading: boolean
   dataSource: any
   height: number
}

const WithMixinProps = (WrappedComponent:any) => {
   return class extends WrappedComponent<DefaultProps, DefaultState> {

      lv: any
      constructor(props:DefaultProps) {
         super(props)

         this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1:any, row2:any) => row1 !== row2 }),
            refreshing: false,
            isLoading: false,
            height: 100
         }

         this.onEndReached = this.onEndReached.bind(this)
         this.onRefresh = this.onRefresh.bind(this)
      }
      componentDidMount () {
         const { invalidateTime, items, start } = this.props
         // 如果当前时间大于失效时间，表示缓存的数据已过期了，重新请求
         if (new Date().getTime() >= invalidateTime || !items.length) {
            this.getData(start)
         } else {
            this.setState({
               dataSource: this.state.dataSource.cloneWithRows(items)
            })
         }

         const dom:any = ReactDOM.findDOMNode(this.lv)
         this.setState({
            height: document.documentElement.clientHeight - dom.offsetTop*2
         })
      }

      getData (start: number, refresh?: boolean) {
         const { count, getMovieList } = this.props

         const { name, params } = this

         getMovieList(name, {start, count, ...params}, refresh)
      }

      // 当列表将要滚动到底部是触发
      onEndReached () {
         const { hasMore, start } = this.props
         if (hasMore) {
            this.setState({ isLoading: true, start: this.state.start + this.state.count})
            this.getData(start)
         }
      }

      // 由于数据都是通过props传递进来的，当有数据更新就将它添加到列表中
      componentWillReceiveProps (nextProps: DefaultProps) {
         this.setState((state: DefaultState) => ({
            dataSource: state.dataSource.cloneWithRows(nextProps.items),
            refreshing: false,
            isLoading: false
         }))
      }

      // 下拉刷新时触发
      onRefresh ():void {
         this.setState({ refreshing: true, isLoading: true })
         // 发送请求
         this.getData(0)
         // 如果请求失败了，做超时处理
         setTimeout(() => {
            this.setState({ refreshing: false, isLoading: false })
         }, 5000)
      }

      render () {
         const separator = (sectionID:number|string, rowID:number|string) => (
            <div
               key={`${sectionID}-${rowID}`}
               style={{
                  backgroundColor: '#F5F5F9',
                  height: 8,
                  borderTop: '1px solid #ECECED',
                  borderBottom: '1px solid #ECECED',
               }}
            />
         )

         const Refresh:any = PullToRefresh
         return (
            <div className="view">
               { super.render() }
               <div className="view-content" ref={el => this.lv = el}>
                  <ListView
                     className="content"
                     style={ {height: this.state.height} }
                     dataSource={ this.state.dataSource }
                     initialListSize={ this.props.count }
                     onEndReached={ this.onEndReached }
                     renderRow={ MovieItem }
                     renderSeparator={separator}
                     pageSize={5}
                     onEndReachedThreshold={30}
                     pullToRefresh={  <Refresh refreshing={ this.state.refreshing } onRefresh={this.onRefresh} /> }
                  >
                  </ListView>
               </div>
            </div>
         )
      }
   }
}

export default WithMixinProps