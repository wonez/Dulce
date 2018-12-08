import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import classes from './Post.scss'

import Toolbar from '../../components/Toolbar/Toolbar'
import PostData from '../../components/PostData/PostData'
import Comments from '../../components/Comments/Comments'
import Confirm from '../../UI/Confirm/Confirm';
import Loading from '../../UI/Loading/Loading';

import { startLoading, endLoading } from '../../store/creators/uiCreators'

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
        item: {},
        comment: '',
        selected: -1,
    }

    commentInputHandler = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                comment: text
            }
        })
    }

    handleUser = (id) => {
        this.props.history.push(`/profile/${id}`);
    }

    commentSubmit = () => {
        this.props.load();
        axios.post(`/post/comment/${this.state.item._id}`, {
            text: this.state.comment,
        }).then(res => {
            if(res.status == 200){
                this.props.loaded();
                this.setState(prevState => {
                    return{
                        ...prevState,
                        comment: '',
                        item: {
                            ...prevState.item,
                            comments: res.data.comments
                        }
                    }
                })
            }
        })
    }

    handleLike = () => {
        if(!this.props.user)
            return;
        axios.post(`/post/like/${this.state.item._id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        return{
                            ...prevState,
                            item:{
                                ...prevState.item,
                                likes: res.data.likes
                            }
                        }

                    })
                }
            })
    }

    editComment = (id, text, i) => {
        this.props.load();
        axios.put(`/post/comment/${id}`, {text})
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        const newState = {
                            ...prevState,
                            item:{
                                ...prevState.item,
                                comments:[
                                    ...prevState.item.comments
                                ]
                            }
                        }
                        newState.item.comments[i].text = res.data.text
                        return newState;
                    })
                    this.props.loaded();
                }
            })
    }

    selectComment = (i) => {
        this.setState({
            selected: i
        })
    }

    deleteComment = () => {
        axios.delete(`/post/comment/${this.state.item._id}/${this.state.item.comments[this.state.selected]._id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        const newState = {
                            ...prevState,
                            item:{
                                ...prevState.item,
                                comments:[
                                    ...prevState.item.comments
                                ]
                            }
                        }
                        newState.item.comments.splice(this.state.selected, 1);
                        return newState;
                    })
                    this.props.loaded();
                }
            })
    }

    render() {
        return (
            <div className={classes.Post}>
                <Toolbar />
                <div className={classes.Post__Container}>
                    <PostData 
                        handleLike={this.handleLike}
                        handleUser={() => this.handleUser(this.state.item.author._id)}
                        item={this.state.item} />
                    <Comments 
                        selectComment={this.selectComment}
                        handleUser={this.handleUser}
                        commentSubmit={this.commentSubmit}
                        commentInputHandler={this.commentInputHandler}
                        comment={this.state.comment}
                        editComment={this.editComment}
                        comments={this.state.item.comments} />
                </div>
                <Confirm confirmHandler={this.deleteComment} />
                <Loading />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        load: () => dispatch(startLoading()),
        loaded: () => dispatch(endLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));