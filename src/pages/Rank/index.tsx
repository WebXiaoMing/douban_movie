import React from 'react'
import { connect } from 'react-redux'

import './index.scss'
import WithMixinProps from '../../components/WithMixinProps'
import { getMovieList } from '../../store/actions'
import { DefaultStateProps } from '../../store/interface'

class Rank extends React.Component {

   readonly name: string
   readonly params: object

   constructor (props: any) {
      super(props)
      this.name = 'rank'
      this.params = {}
   }

   render () {
      return <div className="rank-header">电影TOP250</div>
   }
}

const mapStateToProps = (state: DefaultStateProps) => {
   return state.rank
}
const App:any = WithMixinProps(Rank)
export default connect(
   mapStateToProps,
   { getMovieList }
)(App)