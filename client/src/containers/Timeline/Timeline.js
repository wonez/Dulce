import React, { Component } from 'react'
import { withRouter } from 'react-router' 
import axios from '../../utility/axios'

import Card from '../../components/Card/Card';

import { IconCake } from '../../UI/Icons/Icons'

import classes from './Timeline.scss'

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
        
        let empty = null;

        if(this.state.items.length < 1){
            empty = (
                <div className={classes.NoPosts}>
                    <div className={classes.Icon}>
                        <IconCake />
                    </div>
                    <p>User has no posts</p>
                </div>
            )
        }

        return(
            <div className={classes.Timeline}>
                {this.state.items.map(item => (
                    <Card  singlePost={this.singlePostHandler} data={item} key={item.title}/>
                ))}
                {empty}
            </div>
        )
    }
}

export default withRouter(Timeline);