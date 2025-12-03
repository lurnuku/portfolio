import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './pages/Home'

const App: React.FC = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Redirect to='/page-not-found' />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
