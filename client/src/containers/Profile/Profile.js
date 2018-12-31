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

import { updateAuthData } from '../../store/index'

class Profile extends Component{

    state = {
        active: 'timeline',
        user: null
    }

    componentDidUpdate(prevProps){
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.onRouteChanged();
        }
    }

    componentDidMount(){
        this.onRouteChanged();
    }

    onRouteChanged() {
        const uri = this.props.match.params.uri;
        axios.get(`/user/uri/${uri}`)
        .then(res => {
            if(res.status == 200){
                this.setState({
                    user: res.data
                })
            }
        }).catch(err => {
            this.props.history.push('/');
        })
    }

    activeHandler = (active) => {
        this.setState({
            active: active
        })
    }

    followHandler = () => {
        axios.post(`following/follow/${this.state.user._id}`)
            .then(res => {
                if(res.status == 200){
                    this.props.updateUser(res.data);
                }
            })
    }

    unfollowHandler = () => {
        axios.post(`following/unfollow/${this.state.user._id}`)
            .then(res => {
                if(res.status == 200){
                    this.props.updateUser(res.data);
                } 
            })
    }

    render(){

        let content = null;
        
        if(this.state.active === 'timeline'){
            content = (
               this.state.user ? <Timeline userId={this.state.user._id} /> : null
            )
        } else if(this.state.active === 'following'){
            content = (
                <Following count={this.state.user.following.length} userId={this.state.user._id} />
            )
        } else if (this.state.active === 'about'){
            content = (
                <About user={this.state.user} />
            )
        }

        return(
            <div className={classes.Profile}>
                <Toolbar />
                <div className={classes.Profile__Data}>
                    <ProfileCover 
                        unfollowHandler={this.unfollowHandler}
                        followHandler={this.followHandler}
                        profile={this.state.user}/>
                    <ProfileNavigation active={this.state.active} handler={this.activeHandler} />
                    {content}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (data) => dispatch(updateAuthData({user: data}))
    }
}

export default connect(null, mapDispatchToProps)(Profile); 