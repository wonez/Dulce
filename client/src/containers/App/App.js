import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
					<Route path='/' exact component={Landing}/>
					<Route path="/join" component={Join}/>

					<Protected isLogged={this.props.isLogged} path="/profile/:userId" component={Profile}/>
					<Protected isLogged={this.props.isLogged} path="/post/:postId" component={Post}/>
					{/* <Route path="/post" component={Post}/> */}
					<Route path="/newsfeed" component={NewsFeed}/>
					<Route path="/search" component={Search}/>
					<Route path="/categories" component={AllCategories}/>
					<Route path="/singleCategory" component={Category}/>
					<Protected isLogged={this.props.isLogged} path="/create" component={Create}/>
					<Protected isLogged={this.props.isLogged} path="/editProfile" component={EditProfile}/>
					<Protected isLogged={this.props.isLogged} path="/editPost" component={EditPost}/>
					{/* <Route path="/create" component={Create}/> */}
					{/* <Route path="/editProfile" component={EditProfile}/> */}
					{/* <Route path="/editPost" component={EditPost}/> */}
					<Route render={()=> (<h1>404</h1>)} />
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
