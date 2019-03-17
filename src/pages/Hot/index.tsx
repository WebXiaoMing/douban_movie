import React from 'react'
import ReactDOM from 'react-dom'
import { ListView } from 'antd-mobile'
import { connect } from 'react-redux'

import MovieItem from '../../components/MovieItem'

import './index.scss'
import { getMovieList } from '../../store/actions'
import {DefaultStateProps, Field} from '../../store/interface'
import { RouteComponentProps } from "react-router"


interface DefaultState {
   start: number
   count: number
   refreshing: boolean
   isLoading: boolean
   dataSource: any
   hasMore: true
   height: number
   lv: any
}

type GetMethod = (field: Field, params:any, refresh?:boolean) => any
export interface DefaultProps extends RouteComponentProps {
   getMovieList: GetMethod
   invalidateTime: number
   hasMore: boolean
   start: number
   items: Array<any>
}

class Hot extends React.Component<DefaultProps, DefaultState> {
   lv: any
   data: Array<any>
   constructor (props:any) {

      const dataSource = new ListView.DataSource({
         rowHasChanged: (row1:any, row2:any) => row1 !== row2,
       })

      super(props)
      this.state = {
         dataSource,
         start: 1,
         count: 20,
         isLoading: false,
         hasMore: true,
         refreshing: true,
         height: 0,
         lv: null
      }
      this.data = []
      this.onEndReached = this.onEndReached.bind(this)
   }

   componentDidMount () {
      const { getMovieList, invalidateTime, items } = this.props
      // 如果当前时间大于失效时间，表示缓存的数据已过期了，重新请求
      if (new Date().getTime() >= invalidateTime || !items.length) {
         getMovieList('hot', {
            city: '深圳',
            start: 0,
            count: this.state.count
         })
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

   onEndReached () {
      const { getMovieList, hasMore, start } = this.props
      if (hasMore) {
         this.setState({ isLoading: true, start: this.state.start + this.state.count})
         getMovieList('hot', {
            city: '深圳',
            start,
            count: this.state.count
         })
      }
   }

   componentWillReceiveProps (nextProps: DefaultProps) {
      if (nextProps.items.length !== this.props.items.length) {
         this.setState((state: DefaultState) => ({
            dataSource: state.dataSource.cloneWithRows(nextProps.items)
         }))
      }
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

       
      return (
         <div className="hot">
            <div className="hot-header">
               <div className="header-title">影院热映</div>
               <div className="header-position">深圳</div>
            </div>
            <div className="hot-content" ref={el => this.lv = el}>
               <ListView
                     className="content"
                     style={{height: this.state.height}}
                     dataSource={this.state.dataSource}
                     initialListSize={this.state.count}
                     onEndReached={this.onEndReached}
                     renderRow={ MovieItem }
                     renderSeparator={separator}
                     pageSize={5}
                     onEndReachedThreshold={30}
                  >
               </ListView>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state: DefaultStateProps) => {
   return state.hot
 }
export default connect(
   mapStateToProps,
   { getMovieList }
)(Hot)