import React from 'react'

import Comment from '../Comment/Comment'
import Avatar from '../Avatar/Avatar'
import Aux from '../../hoc/Aux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './Comments.scss'

const Comments = (props) => {
    return(
        <Aux>
            <div className={classes.NewComment}>
                <div className={classes.NewComment__CommentBox}>
                    <Avatar url={props.comments[0].author.imgPath}/>
                    <textarea   className={classes.NewComment__InputArea}
                                placeholder="Enter your comment here." />
                </div>
                <div className={classes.NewComment__BtnBox}>
                    <BtnPrimary size="small">Comment</BtnPrimary>
                </div>
            </div>
            <div className={classes.Comments}>
                {props.comments.map(comment => {
                    return <Comment comment={comment} key={comment.author.name} />
                })}
            </div>
        </Aux>
    )
}

export default Comments