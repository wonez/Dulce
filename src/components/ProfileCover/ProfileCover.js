import React from 'react';

import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './ProfileCover.scss'

const ProfileCover = (props) => {

    return(
        <div className={classes.ProfileCover}>
            <div className={classes.ProfileCover__Data}>
                <div className={classes.ProfileCover__Data__Img}>
                    {/* slika */}
                </div>
                <h2 className={classes.ProfileCover__Data__Name}>{props.profile.name}</h2>                
                <div style={{marginRight: '3rem'}}>
                    <BtnPrimary size="big">
                        Follow
                    </BtnPrimary>
                </div>
            </div>
        </div>
    );
}

export default ProfileCover;

