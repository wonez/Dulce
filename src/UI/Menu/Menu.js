import React, { Component } from 'react'

import classes from './Menu.scss';

import { IconUser } from '../Icons/Icons'
import Aux from '../../hoc/Aux'

class MenuBtn extends Component {

    uncheck = () => {
        this.checkbox.checked = false;
    }

    render(){
        return (
            <div className={classes.Btn}>
                <input ref={el => this.checkbox = el} className={classes.Input} type="checkbox" id="menu"/>
                <div onClick={this.uncheck} className={classes.MenuBg}>
                </div>
                <div className={classes.Menu}>
                    <a href="#" className={classes.Menu__Btn}>
                        My Profile
                    </a>
                    <a href="#" className={classes.Menu__Btn}>
                        Edit Profile
                    </a>
                    <a href="#" className={classes.Menu__Btn}>
                        Log out
                    </a>
                </div>
                <label htmlFor="menu" className={classes.Label}>
                    <IconUser />    
                </label>
            </div>
        )
    }
}

export default MenuBtn;
