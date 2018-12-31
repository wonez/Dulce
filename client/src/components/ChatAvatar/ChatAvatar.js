import React from 'react'

import classes from './ChatAvatar.scss'

const ChatAvatar = (props) => (
    <div    className={classes.ChatAvatar}
            onClick={() => props.handleAvatarClick(props.user.uri)}
            style={{backgroundImage: `url(${props.user.avatarUrl})`}}>
        <div className={classes.AvatarTooltip} style={props.all ? {visibility: 'visible'} : null}>
            {props.user.name} {props.user.surname}
        </div>
    </div>
)

export default ChatAvatar;