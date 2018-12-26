import React from 'react';

import ChatAvatar from '../ChatAvatar/ChatAvatar'

import classes from './ChatShowOnlineAll.scss'
import Aux from '../../hoc/Aux';

const ChatShowOnlineAll = (props) =>{
    return(
        <Aux>
            <div  onClick={props.handleClose} className={classes.Background}></div>
            <div className={classes.Content}>
                <div onClick={props.handleClose} className={classes.Close}>X</div>
                <div className={classes.Data}>
                    {props.users.map(user => {
                        return <ChatAvatar all user={user} key={user._id} handleAvatarClick={props.handleAvatarClick}/>
                    })}
                </div>
            </div>
        </Aux>
    )
}

export default ChatShowOnlineAll;