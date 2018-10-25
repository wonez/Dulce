import React, { Component } from 'react';
import { connect } from 'react-redux'

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

        console.log(this.props);

        return(
            <div className={classes.Profile}>
                <Toolbar />
                <div className={classes.Profile__Data}>
                    <ProfileCover profile={this.props.user}/>
                    <ProfileNavigation active={this.state.active} handler={this.activeHandler} />
                    {content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(Profile); 