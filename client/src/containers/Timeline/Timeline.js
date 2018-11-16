import React, { Component } from 'react'
import { withRouter } from 'react-router' 
import axios from '../../utility/axios'

import Card from '../../components/Card/Card';

import classes from './Timeline.scss'
import NothingToShow from '../NothingToShow/NohtingToShow';

class Timeline extends Component {

    state = {
        items: []
    }

    componentDidMount(){
        axios.get(`/post/user/${this.props.userId}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        items: res.data.posts
                    })
                }
            })
    }

    singlePostHandler = (id) => {
        this.props.history.replace(`/post/${id}`)
    }

    render(){
    
        return(
            <div className={classes.Timeline}>
                {this.state.items.map(item => (
                    <Card  singlePost={this.singlePostHandler} data={item} key={item.title}/>
                ))}
                {this.state.items.length < 1 ? <NothingToShow 
                                                    icon='post'
                                                    message='User has no posts'/> : null}
            </div>
        )
    }
}

export default withRouter(Timeline);