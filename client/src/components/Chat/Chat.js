import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Chat.scss'

import IconButton from '../../UI/IconButton/IconButton'
import { IconChat } from '../../UI/Icons/Icons'
import Aux from '../../hoc/Aux'
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import ChatShowOnlineAll from '../ChatShowOnlineAll/ChatShowOnlineAll'
import { sendMessage, emitIsTyping, emitStoppedTyping } from '../../store/creators/chatCreators'

class Chat extends React.Component{

    state = {
        show: true,
        showAll: false,
        message: '',
        timeout: null
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

    handleTextChanged = (e) => {
        if(!this.state.timeout){
            this.props.emitIsTyping()
        }
        if(this.state.timeout){
            clearTimeout(this.state.timeout)
        }
        this.setState({
            message: e.target.value,
            timeout: setTimeout(() => {
                this.setState({
                    timeout: null
                })
                this.props.emitStoppedTyping();
            }, 700)
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        if(this.state.message.trim() != ''){
            this.props.sendMessage(this.state.message);
            this.setState({
                message: ''
            })
        }
    }
    scrollDown = () => {
        if(this.chatScroll && this.chatScroll.scrollTop != this.chatScroll.scrollHeight)
            this.chatScroll.scrollTop = this.chatScroll.scrollHeight
    }

    componentDidUpdate(){
        this.scrollDown()
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
                            <div ref={el => this.chatScroll = el} className={classes.Chat__Written}>
                                {this.props.messages.map(msg => {
                                    return (
                                        <div key={msg.time} className={msg.author._id == this.props.user._id ? classes.MyMsgContainer : classes.OthersMsgContainer}>
                                            <p className={msg.author._id == this.props.user._id ? classes.MyMsg : classes.OthersMsg} >{msg.text}</p>
                                            {msg.author._id != this.props.user._id ? <a onClick={() => this.handleAvatarClick(msg.author._id)} className={classes.Author}>{`${msg.author.name} ${msg.author.surname}`}</a> : null}
                                        </div>
                                    )
                                })}
                                {this.props.typing ? <div className={classes.Chat__Typing}>...</div> : null }
                            </div>
                        </div>
                        <form onSubmit={this.sendMessageHandler}>
                            <input onChange={this.handleTextChanged} value={this.state.message} placeholder="Say something..." className={classes.Chat__New}>
                            </input>
                        </form>
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
        user: state.auth.user,
        users: state.chat.online,
        messages: state.chat.messages,
        typing: state.chat.typing
    }
}

const mapDispatchToProps = dispatch => {
    return{
        sendMessage: (msg) => dispatch(sendMessage(msg)),
        emitIsTyping: () => dispatch(emitIsTyping()),
        emitStoppedTyping: () => dispatch(emitStoppedTyping())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));

