import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Landing from '../Landing/Landing';
import Signin from '../Signin/Signin';

import Aux from '../../hoc/Aux';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>
					<Route path="/signin" component={Signin}/>
					<Route render={()=> (<h1>404</h1>)} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
