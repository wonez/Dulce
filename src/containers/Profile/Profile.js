import React, { Component } from 'react';

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
        profile: {
            name: 'John Doe'
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
                <Timeline />
            )
        } else if(this.state.active === 'following'){
            content = (
                <Following />
            )
        } else if (this.state.active === 'about'){
            content = (
                <About />
            )
        }

        return(
            <div className={classes.Profile}>
                <Toolbar />
                <div className={classes.Profile__Data}>
                    <ProfileCover images={{
                        cover: 'src/assets/cover.jpg',
                        avatar: 'src/assets/profile.jpg'
                    }} profile={this.state.profile}/>
                    <ProfileNavigation active={this.state.active} handler={this.activeHandler} />
                    {content}
                </div>
            </div>
        )
    }
}

export default Profile;