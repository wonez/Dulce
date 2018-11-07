import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../../utility/axios'

import ProfileCover from '../../components/ProfileCover/ProfileCover';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation'
import Toolbar from '../../components/Toolbar/Toolbar'

import Timeline from '../Timeline/Timeline';
import Following from '../Following/Following';
import About from '../About/About';

import classes from './Profile.scss';

class Profile extends Component{

    state = {
        active: 'timeline',
        user: null
    }

    componentDidMount(){
        const userId = this.props.match.params.userId;
        if(userId){
            axios.get(`/user/${userId}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        user: res.data
                    })
                }
            })
        }
    }

    activeHandler = (active) => {
        this.setState({
            active: active
        })
    }

    render(){

        let content = null;
        
        if(this.state.active === 'timeline'){
            content = (
                <Timeline userId={this.props.match.params.userId} />
            )
        } else if(this.state.active === 'following'){
            content = (
                <Following userId={this.props.match.params.userId} />
            )
        } else if (this.state.active === 'about'){
            content = (
                <About userId={this.props.match.params.userId} />
            )
        }

        return(
            <div className={classes.Profile}>
                <Toolbar />
                <div className={classes.Profile__Data}>
                    <ProfileCover profile={this.state.user}/>
                    <ProfileNavigation active={this.state.active} handler={this.activeHandler} />
                    {content}
                </div>
            </div>
        )
    }
}

export default Profile; 