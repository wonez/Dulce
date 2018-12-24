import React from 'react'

import classes from './Chat.scss'

import IconButton from '../../UI/IconButton/IconButton'
import { IconChat } from '../../UI/Icons/Icons'
import Aux from '../../hoc/Aux'

class Chat extends React.Component{

    state = {
        show: false
    }

    handleChat = () => {
        this.setState(prevState => {
            return{
                ...prevState,
                show: !prevState.show
            }
        })
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

export default Chat;

