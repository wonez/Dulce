import React from 'react'

import { withRouter } from 'react-router-dom' 
import axios from '../../utility/axios'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar';

import CardSmall from '../../components/CardSmall/CardSmall'
import Person from '../../components/Person/Person'

import classes from './Search.scss'
import NothingToShow from '../../components/NothingToShow/NothingToShow';

class Search extends React.Component{

    state = {
        search: '',
        recipes: [],
        users: [],
        recipesCount: 0,
        usersCount: 0,
        usersLoading: false,
        recipesLoading: false
    }

    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){
            this.onRouteChanged();
        }
    }

    componentDidMount(){
        this.onRouteChanged();
    }

    onRouteChanged(){
        const params = new URLSearchParams(this.props.location.search)
        const search = params.get('value');
        if(!search){
            this.props.history.replace('/')
        } else {
            this.setState({
                search
            })
            axios({
                method: 'get',
                url: '/search',
                params: {
                    value: search
                }
            }).then(res => {
                if(res.status == 200){
                    this.setState({
                        recipes: res.data.recipes,
                        users: res.data.users,
                        recipesCount: res.data.recipesCount,
                        usersCount: res.data.usersCount
                    })
                }
            })
        }
    }

    clickHandler = (type, uri) => {
        let url = ''
        if(type == 'card'){
            url = `post/${uri}`
        }else if(type == 'person'){
            url = `profile/${uri}`
        }
        this.props.history.push(url);
    }

    getMore = (type) => {
        if(type == 'recipes'){
            return axios.get(`search/recipes?value=${this.state.search}&start=${this.state.recipes.length}`);
        }else if(type == 'users'){
            return axios.get(`serach/users?value=${this.state.search}&start=${this.state.users.length}`);
        }
    }

    loadMoreHandler = (type) => {
        if(type == 'recipes'){
            this.setState({ recipesLoading: true })
            this.getMore('recipes').then(res => {
                this.setState(prevState => {
                    const newState = {
                        ...prevState,
                        recipes: res.status == 200 ? prevState.recipes.concat(res.data.recipes) : [...prevState.recipes],
                        recipesLoading: false,
                    }
                    return newState
                })
            })
        } else if (type == 'users'){
            this.setState({ usersLoading: true })
            this.getMore('users').then(res => {
                this.setState(prevState => {
                    const newState = {
                        ...prevState,
                        users: res.status == 200 ? prevState.users.concat(res.data.users) : [...prevState.users],
                        usersLoading: false,
                    }
                    return newState
                })
            })
        }
    }

    render(){

        let loadMorePosts = null;
        let loadMoreUsers = null

        if(this.state.recipesLoading){
            loadMorePosts = <h2>Loading...</h2>
        } else if (this.state.recipes.length < this.state.recipesCount){
            loadMorePosts = <a className={classes.Search__LoadMore} onClick={() => this.loadMoreHandler('recipes')} >Load More</a>
        }

        if(this.state.usersLoading){
            loadMoreUsers = <h2>Loading...</h2> 
        } else if (this.state.users.length < this.state.usersCount){
            loadMoreUsers = <a className={classes.Search__LoadMore} onClick={() => this.loadMoreHandler('users')}>Load More</a>
        }

        const recipes = this.state.recipes.map(item => {
            return <CardSmall   card={item} 
                                click={() => this.clickHandler('card', item._id)}
                                key={item._id} />
        })

        const users = this.state.users.map(person => {
            return <Person  data={person} 
                            click={() => this.clickHandler('person', person._id)}                
                            key={person._id} />
        })

        return(
            <Aux>
                <Toolbar />
                <div className={classes.Info}>
                    <h1>Search results for: <span>{this.state.search}</span></h1>
                </div>
                <div className={classes.Search}>
                    <div className={classes.Search__Container}>
                        <h2 className={classes.Search__Heading}>Recipes</h2>
                        <small>Results: {this.state.recipesCount}</small>
                        {this.state.recipes.length > 0 ?
                            <div className={classes.Search__Items}>
                                {recipes}
                            </div>
                        : <NothingToShow
                            icon='post'
                            message='No recipes found'/>}
                        {loadMorePosts}
                    </div>
                    <div className={classes.Search__Container}>
                        <h2 className={classes.Search__Heading}>People</h2>
                        <small>Results: {this.state.users.length}</small>                        
                        {this.state.users.length > 0 ?
                            <div className={classes.Search__Items}>
                                {users}
                            </div>
                        : <NothingToShow 
                                icon='user'
                                message='No users found'/>}
                        {loadMoreUsers}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withRouter(Search);