import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Chat.scss'

import IconButton from '../../UI/IconButton/IconButton'
import { IconChat } from '../../UI/Icons/Icons'
import Aux from '../../hoc/Aux'
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import ChatShowOnlineAll from '../ChatShowOnlineAll/ChatShowOnlineAll'

class Chat extends React.Component{

    state = {
        show: true,
        showAll: false
    }

    handleChat = () => {
        this.setState(prevState => {
            return{
                ...prevState,
                show: !prevState.show
            }
        })
    }

    handleShowALl = () => {
        this.setState(prevState => ({
            ...prevState,
            showAll: !prevState.showAll
        }))
    }

    handleAvatarClick = (id) => {
        this.props.history.push(`/profile/${id}`);
    }

    render(){

        let chat = null;

        if(this.state.show){
            chat = (
                <Aux>
                    <div className={classes.Chat}>
                        <div className={classes.Chat__Info}>
                            <p>Dulce Chat Room</p>
                            <div onClick={this.handleChat} className={classes.Chat__Close}>X</div>
                        </div>
                        <div className={classes.Chat__Box}>
                            <div className={classes.Chat__Online}>
                                {this.props.users.slice(0, 6).map(user => {
                                    return <ChatAvatar user={user} key={user._id} handleAvatarClick={this.handleAvatarClick}/>
                                })}
                                {this.props.users.length > 6 ? <p onClick={this.handleShowALl} className={classes.LoadMore}>+{this.props.users.length - 6}</p> : null}
                            </div>
                            <div className={classes.Chat__Written}>
                            </div>
                        </div>
                        <input placeholder="Say something..." className={classes.Chat__New}>
                        </input>
                    </div>
                    {this.state.showAll ? <ChatShowOnlineAll handleAvatarClick={this.handleAvatarClick} users={this.props.users} handleClose={this.handleShowALl} handleClick={this.handleAvatarClick} /> : null}
                </Aux>
            )
        }

        return(
            <Aux>
                <IconButton click={this.handleChat}>
                    <IconChat />
                </IconButton>
                {chat}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        users: state.chat.online
    }
}

export default connect(mapStateToProps)(withRouter(Chat));

