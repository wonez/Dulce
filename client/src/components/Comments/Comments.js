import React from 'react'

import { connect } from 'react-redux'

import Comment from '../Comment/Comment'
import Avatar from '../Avatar/Avatar'
import Aux from '../../hoc/Aux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './Comments.scss'

const Comments = (props) => {

    let comments = null;

    if(props.comments){
        comments = props.comments.map(comment => {
            return <Comment comment={comment} key={comment.author.name} />
        })
    }

    return(
        <Aux>
            <div className={classes.NewComment}>
                <div className={classes.NewComment__CommentBox}>
                    <Avatar url={props.user.avatarUrl}/>
                    <textarea   className={classes.NewComment__InputArea}
                                placeholder="Enter your comment here." />
                </div>
                <div className={classes.NewComment__BtnBox}>
                    <BtnPrimary size="small">Comment</BtnPrimary>
                </div>
            </div>
            <div className={classes.Comments}>
                {comments}
            </div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Comments)