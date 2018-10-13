import React, { Component } from 'react'
import { withRouter } from 'react-router'

import classes from './Toolbar.scss';

import IconButton from '../../UI/IconButton/IconButton'
import Menu from '../../UI/Menu/Menu'

import { IconMagnifyingGlass, IconPlus, IconCake } from '../../UI/Icons/Icons'

class Toolbar extends Component {

    handleHome = () => {
        this.props.history.push('/');
    }

    render(){
        return (
            <div className={classes.Toolbar}>
                <IconButton click={this.handleHome}>
                    <IconCake />
                </IconButton>
                <div className={classes.Search__InputBox}>
                    <input className={classes.Search__Input} type="text" placeholder="Search for a Recipe or a User"></input>
                    <div className={classes.Search__Icon}>
                        <IconButton>
                            <IconMagnifyingGlass />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <IconButton>
                        <IconPlus />
                    </IconButton>
                    <Menu />
                </div>
            </div>
        )
    }
}

export default withRouter(Toolbar);