import React from 'react'

import classes from './ChatAvatar.scss'

const ChatAvatar = (props) => (
    <div    className={classes.ChatAvatar}
            onClick={() => props.handleAvatarClick(props.user._id)}
            style={{backgroundImage: `url(${props.user.avatarUrl})`}}
            key={props.user._id}>
        <div className={classes.AvatarTooltip} style={props.all ? {visibility: 'visible'} : null}>
            {props.user.name} {props.user.surname}
        </div>
    </div>
)

export default ChatAvatar;