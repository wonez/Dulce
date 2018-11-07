import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../../store'

import classes from './Menu.scss';

import { IconUser } from '../Icons/Icons'
import Aux from '../../hoc/Aux'

class MenuBtn extends Component {

    uncheck = () => {
        this.checkbox.checked = false;
    }

    goTo(url){
        this.props.history.replace(url)
    }

    render(){
        return (
            <div className={classes.Btn}>
                <input ref={el => this.checkbox = el} className={classes.Input} type="checkbox" id="menu"/>
                <div onClick={this.uncheck} className={classes.MenuBg}>
                </div>
                <div className={classes.Menu}>
                    <a onClick={() => {this.goTo(`/profile/${this.props.userId}`)}} className={classes.Menu__Btn}>
                        My Profile
                    </a>
                    <a onClick={() => {this.goTo('/editProfile')}} className={classes.Menu__Btn}>
                        Edit Profile
                    </a>
                    <a onClick={() => {this.props.logout(); this.goTo('')}} className={classes.Menu__Btn}>
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

const mapStateToProps = state => {
    return {
        userId: state.auth.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBtn));
