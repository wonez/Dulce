import React from 'react'

import classes from './Comment.scss'

const Comment = ({comment}) => {

    const date = comment.date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });    

    return(
        <div className={classes.Comment}> 
            <div className={classes.AvatarBox}>
                <div    className={classes.Avatar}
                        style={{backgroundImage: `url(${comment.author.imgPath})`}} >
                    {/* slika */}
                </div>
            </div>
            <div className={classes.InfoBox}>
                <div className={classes.InfoBox__Info}>
                    <a className={classes.InfoBox__Info__Name} href="#">{comment.author.name}</a>
                    <p className={classes.InfoBox__Info__Date}>{date}</p>
                </div>
                <p className={classes.InfoBox__Content}>
                    {comment.content}
                </p>
            </div>
        </div>
    )
}

export default Comment;