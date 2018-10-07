import React from 'react';
import classes from './ProfileCover.scss'

const ProfileCover = () => {
    return(
        <div className={classes.ProfileCover}>
            <div className={classes.ProfileCover__Data}>
                <div className={classes.ProfileCover__Data__Img}>
                    {/* slika */}
                </div>
                <div className={classes.ProfileCover__Data__Follow}>
                    Follow
                </div>
            </div>
        </div>
    );
}

export default ProfileCover;

