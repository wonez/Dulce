import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../Landing/Landing';
import Join from '../Join/Join';
import Profile from '../Profile/Profile';
import Post from '../Post/Post'
import NewsFeed from '../NewsFeed/NewsFeed'
import AllCategories from '../AllCategories/AllCategories'
import Category from '../Category/Category'
import Search from '../Search/Search'
import Create from '../Create/Create'
import EditProfile from '../EditProfile/EditProfile'
import EditPost from '../EditPost/EditPost'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>
					<Route path="/join" component={Join}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/post" component={Post}/>
					<Route path="/newsfeed" component={NewsFeed}/>
					<Route path="/search" component={Search}/>
					<Route path="/allcategories" component={AllCategories}/>
					<Route path="/singleCategory" component={Category}/>
					<Route path="/create" component={Create}/>
					<Route path="/editProfile" component={EditProfile}/>
					<Route path="/editPost" component={EditPost}/>
					<Route render={()=> (<h1>404</h1>)} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;