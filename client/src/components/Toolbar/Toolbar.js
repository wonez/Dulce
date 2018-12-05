import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'

import classes from './Toolbar.scss';

import IconButton from '../../UI/IconButton/IconButton'
import Menu from '../../UI/Menu/Menu'

import { IconMagnifyingGlass, IconPlus, IconCake, IconCategories } from '../../UI/Icons/Icons'

class Toolbar extends Component {

    state = {
        search: ''
    }

    textChangedHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleHome = () => {
        this.props.history.push('/')
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/search',
            search:  "?" + new URLSearchParams({value: this.state.search}).toString()
        });
    }

    handleCreate = (e) => {
        this.props.history.push('/create')
    }

    handleCategories = (e) => {
        this.props.history.push('/categories')
    }

    render(){

        let content = (
            <div className={classes.ToolbarPlain}>
                <div style={{display: 'inline-block'}}>
                    <IconButton click={this.handleHome}>
                        <IconCake /> <span>Dulce</span>
                    </IconButton>
                </div>
            </div>
        )

        if(this.props.user && this.props.user._id){
            content = (
                <div className={classes.Toolbar}>
                    <IconButton click={this.handleHome}>
                        <IconCake />
                    </IconButton>
                    <div className={classes.Search__InputBox}>
                        <form onSubmit={this.handleSearch}>
                            <input  className={classes.Search__Input} 
                                    value={this.state.search}
                                    onChange={this.textChangedHandler} 
                                    type="text" 
                                    placeholder="Search for a Recipe or a User"></input>
                            <div className={classes.Search__Icon}>
                                <IconButton click={this.handleSearch}>
                                    <IconMagnifyingGlass />
                                </IconButton>
                            </div>
                        </form>
                    </div>
                    <div className={classes.Buttons}>
                        <IconButton click={this.handleCategories}>
                            <IconCategories />
                        </IconButton>
                        <IconButton click={this.handleCreate}>
                            <IconPlus />
                        </IconButton>
                        <Menu />
                    </div>
                </div>
            )
        }
        return content;
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(Toolbar));