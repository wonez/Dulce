import React, { Component } from 'react';

import ProfileCover from '../../components/ProfileCover/ProfileCover';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation'
import Toolbar from '../../components/Toolbar/Toolbar'

import classes from './Profile.scss';

class Profile extends Component{

    render(){
        return(
            <div className={classes.Profile}>
                <Toolbar />
                <div className={classes.Profile__Data}>
                    <ProfileCover />
                    <ProfileNavigation />
                    <div>
                        content
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;