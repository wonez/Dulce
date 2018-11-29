import React, { Component } from 'react'
import { withRouter } from 'react-router' 
import axios from '../../utility/axios'

import Card from '../../components/Card/Card';

import classes from './Timeline.scss'
import NothingToShow from '../../components/NothingToShow/NothingToShow';

class Timeline extends Component {

    state = {
        items: []
    }

    componentDidMount(){
        this.onRouteChanged();
    }

    componentDidUpdate(prevProps){
        if(this.props.userId !== prevProps.userId){
            this.onRouteChanged();
        }
    }

    onRouteChanged(){
        axios.get(`/post/user/${this.props.userId}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        items: res.data.posts
                    })
                }
            })
    }

    handleLike = (id, i) => {
        axios.post(`/post/like/${id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        const newState = {
                            ...prevState,
                            items:[
                                ...prevState.items,
                            ]
                        }
                        newState.items[i] = {
                            ...prevState.items[i],
                            likes: [...res.data.likes]
                        }
                        return newState;
                    })
                }
            })
    }

    render(){
    
        return(
            <div className={classes.Timeline}>
                {this.state.items.map((item, i) => (
                    <Card  
                        handleLike={() => { this.handleLike(item._id, i) }}
                        data={item} 
                        key={item._id}/>
                ))}
                {this.state.items.length < 1 ? <NothingToShow 
                                                    icon='post'
                                                    message='User has no posts'/> : null}
            </div>
        )
    }
}

export default withRouter(Timeline);