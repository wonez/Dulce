import React from 'react'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import Comment from '../Comment/Comment'
import Avatar from '../Avatar/Avatar'
import Aux from '../../hoc/Aux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './Comments.scss'

const Comments = (props) => {

    let comments = null;

    if(props.comments){
        comments = props.comments.map((comment, i) => {
            return <Comment
                        selectComment={()=>{props.selectComment(i)}} 
                        editComment={(id, text) => {props.editComment(id, text, i)}}
                        handleUser={props.handleUser}
                        comment={comment} 
                        key={comment._id} />
        })
    }

    let newComment = (
        <Aux>
            <div className={classes.NewCommentGuest__CommentBox}>
                <h2>Only regitered users can post comments</h2>
                <BtnPrimary 
                    click={() => props.history.push('/join')}
                    size="small">Sign Up</BtnPrimary>
            </div>
        </Aux>
    )
    

    if(props.isLogged){
        newComment = (
            <Aux>
                <div className={classes.NewComment__CommentBox}>
                    <Avatar url={props.user.avatarUrl}/>
                    <textarea   className={classes.NewComment__InputArea}
                                value={props.comment}
                                onChange={(e) => props.commentInputHandler(e.target.value)}
                                placeholder="Enter your comment here." />
                </div>
                <div className={classes.NewComment__BtnBox}>
                    <BtnPrimary 
                        disabled={props.comment.trim().length == 0}
                        click={props.commentSubmit}
                        size="small">Comment</BtnPrimary>
                </div>
            </Aux>
        )
    }
    
    return(
        <Aux>
            <div className={props.isLogged ? classes.NewComment : classes.NewCommentGuest}>
                {newComment}
            </div>
            {props.comments && props.comments.length ? 
                <div className={classes.Comments}>
                    {comments}
                </div>
            : null }
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(withRouter(Comments))