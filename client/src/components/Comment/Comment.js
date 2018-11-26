import React from 'react'

import classes from './Comment.scss'
import { PromiseProvider } from 'mongoose';

const Comment = ({comment, handleUser}) => {

    const date = new Date(comment.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });    

    return(
        <div className={classes.Comment}> 
            <div className={classes.AvatarBox}>
                <div    className={classes.Avatar}
                        style={{backgroundImage: `url(${comment.author.avatarUrl})`}} >
                    {/* slika */}
                </div>
            </div>
            <div className={classes.InfoBox}>
                <div className={classes.InfoBox__Info}>
                    <a  className={classes.InfoBox__Info__Name} 
                        onClick={()=> handleUser(comment.author._id)}>{`${comment.author.name} ${comment.author.surname}`}</a>
                    <p className={classes.InfoBox__Info__Date}>{date}</p>
                </div>
                <p className={classes.InfoBox__Content}>
                    {comment.text}
                </p>
            </div>
        </div>
    )
}

export default Comment;