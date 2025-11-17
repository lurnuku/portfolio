import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './pages/Home'

const App: React.FC = () => {
	return (
		<div className='m-10'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					{/* <Route exact path='/page-not-found'>
						<NotFound />
					</Route>
					<Route exact path='/error'>
						<Error />
					</Route> */}
					<Redirect to='/page-not-found' />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
