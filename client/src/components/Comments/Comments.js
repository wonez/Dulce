import React from 'react'

import { connect } from 'react-redux'

import Comment from '../Comment/Comment'
import Avatar from '../Avatar/Avatar'
import Aux from '../../hoc/Aux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'
import Loading from '../../UI/Loading/Loading'

import classes from './Comments.scss'

const Comments = (props) => {

    let comments = null;

    if(props.comments){
        comments = props.comments.map(comment => {
            return <Comment 
                        handleUser={props.handleUser}
                        comment={comment} 
                        key={comment._id} />
        })
    }

    return(
        <Aux>
            <div className={classes.NewComment}>
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
            </div>
            <Loading />
            <div className={classes.Comments}>
                {comments}
            </div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Comments)