import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Chat.scss'

import IconButton from '../../UI/IconButton/IconButton'
import { IconChat } from '../../UI/Icons/Icons'
import Aux from '../../hoc/Aux'

class Chat extends React.Component{

    state = {
        show: true
    }

    handleChat = () => {
        this.setState(prevState => {
            return{
                ...prevState,
                show: !prevState.show
            }
        })
    }

    handleAvatarClick = (id) => {
        this.props.history.push(`/profile/${id}`);
    }

    render(){

        let chat = null;

        if(this.state.show){
            chat = (
                <div className={classes.Chat}>
                    <div className={classes.Chat__Info}>
                        <p>Dulce Chat Room</p>
                        <div onClick={this.handleChat} className={classes.Chat__Close}>X</div>
                    </div>
                    <div className={classes.Chat__Box}>
                        <div className={classes.Chat__Online}>
                            {
                                this.props.users.slice(0, 6).map(user => {
                                    return (
                                        <div    className={classes.Chat__Avatar}
                                                onClick={() => this.handleAvatarClick(user._id)}
                                                style={{backgroundImage: `url(${user.avatarUrl})`}}
                                                key={user._id}>
                                            <div className={classes.Chat__Tooltip}>
                                                {user.name} {user.surname}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {this.props.users.length > 6 ? <p className={classes.LoadMore}>...</p> : null}
                        </div>
                        <div className={classes.Chat__Written}>
                        </div>
                    </div>
                    <input placeholder="Say something..." className={classes.Chat__New}>
                    </input>
                </div>
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

