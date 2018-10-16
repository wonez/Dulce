import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../Landing/Landing';
import Signin from '../Signin/Signin';
import Profile from '../Profile/Profile';
import Post from '../Post/Post'
import NewsFeed from '../NewsFeed/NewsFeed'
import AllCategories from '../AllCategories/AllCategories'
import Category from '../Category/Category'
import Search from '../Search/Search'
import Create from '../Create/Create'

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
					<Route path="/search" component={Search}/>
					<Route path="/allcategories" component={AllCategories}/>
					<Route path="/singleCategory" component={Category}/>
					<Route path="/create" component={Create}/>
					<Route render={()=> (<h1>404</h1>)} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
