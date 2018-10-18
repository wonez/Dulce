import React, { Component } from 'react'

import classes from './Popup.scss' 

class Popup extends Component {

    uncheck = () => {
        this.checkbox.checked = false;
    }

    goTo(url){
        this.props.history.replace(url)
    }

    render(){
        return(
            <div className={classes.Popup}>
                <input  ref={el => this.checkbox = el} 
                        className={classes.Input} 
                        type="checkbox" 
                        id="popup"/>
                <div    onClick={this.uncheck} 
                        className={classes.PopupBg}>
                </div>
                <div className={classes.Menu}>
                    <a className={classes.Menu__Link}>Edit Post</a>
                    <a className={classes.Menu__Link}>Delete Post</a>
                </div>
                <label  htmlFor="popup" 
                        className={classes.PopupBtn}>
                    <div className={classes.PopupIcon}>
                    </div>
                </label>
            </div>
        )
    }
}

export default Popup;