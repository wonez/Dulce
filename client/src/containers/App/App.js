import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Protected from '../../hoc/Protected'

import { connect } from 'react-redux';

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

import { checkCookies } from '../../store/creators/authCreators'

class App extends Component {

		
	componentDidMount(){
		this.props.checkCookies();
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>{/* landscape, newsfeed */}
					<Route path="/join" component={Join}/>{/* landscape */}
					<Route path="/profile/:userId" component={Profile}/>
					<Route path="/post/:postId" component={Post}/>{/* landscape */}
					<Route path="/search" component={Search}/>
					<Route path="/categories" component={AllCategories}/>{/* landscape */}
					<Route path="/category/:id" component={Category}/>{/* landscape, provjeri onaj krug na card small */}
					<Protected isLogged={this.props.isLogged} path="/create" component={Create}/>
					<Protected isLogged={this.props.isLogged} path="/editProfile" component={EditProfile}/>
					<Protected isLogged={this.props.isLogged} path="/editPost" component={EditPost}/>
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.auth.isLogged
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkCookies: () => { dispatch(checkCookies()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
