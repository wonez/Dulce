import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../Landing/Landing';
import Signin from '../Signin/Signin';
import Profile from '../Profile/Profile';
import Post from '../Post/Post'
import NewsFeed from '../NewsFeed/NewsFeed'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>
					<Route path="/signin" component={Signin}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/post" component={Post}/>
					<Route path="/newsfeed" component={NewsFeed}/>
					<Route render={()=> (<h1>404</h1>)} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
