import React, { Component } from 'react'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import Tabs from './components/Tabs'
import routes from './router'

class App extends Component {
	
	render() {
		return (
			<div>
				<Provider store={store}>
					<BrowserRouter>
						<div id="app">
							<Route exact path="/" render={() => <Redirect to="/hot"/>}/>
							{
								routes.map(route => <Route {...route} />)
							}
							<Tabs></Tabs>
						</div>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}

export default App
