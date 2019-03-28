import React from 'react'
import { connect } from 'react-redux'

import WithMixinProps from '../../components/WithMixinProps'

import './index.scss'
import { getMovieList } from '../../store/actions'
import { DefaultStateProps } from '../../store/interface'


class Hot extends React.Component {
   name: string
   params: object
   constructor (props:any) {
      super(props)
      this.name = 'hot'
      this.params = {
         city: '深圳'
      }
   }

   render () {
      return (
         <div className="hot-header">
            <div className="header-title">影院热映</div>
            <div className="header-position">深圳</div>
         </div>
      )
   }
}

const mapStateToProps = (state: DefaultStateProps) => {
   return state.hot
 }
 const App:any = WithMixinProps(Hot)
export default connect(
   mapStateToProps,
   { getMovieList }
)(App)