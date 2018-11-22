import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import classes from './Post.scss'

import Toolbar from '../../components/Toolbar/Toolbar'
import PostData from '../../components/PostData/PostData'
import Comments from '../../components/Comments/Comments'
import axios from '../../utility/axios'

class Post extends Component {

    componentDidMount(){
        const postId = this.props.match.params.postId;
        axios.get(`/post/${postId}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        item: res.data
                    })
                }
            })
    }

    state = {
        item: {}
    }

    handleUser = () => {
        this.props.history.push(`/user/${this.state.item.author._id}`);
    }

    render() {

        return (
            <div className={classes.Post}>
                <Toolbar />
                <div className={classes.Post__Container}>
                    <PostData 
                        handleUser={this.handleUser}
                        item={this.state.item} />
                    <Comments comments={this.state.item.comments} />
                </div>
            </div>
        )
    }
}

export default withRouter(Post);