import React from 'react';

import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './ProfileCover.scss'

const ProfileCover = (props) => {

    let content = null;

    if(props.profile){

        const bg = props.profile.coverUrl ? 
        `linear-gradient(to bottom, transparent, rgba(0,0,0,.6)), url('${props.profile.coverUrl}')` :
        `linear-gradient(to bottom, gold, goldenrod)`

        content = (
            <div className={classes.ProfileCover}
                style={{
                    backgroundImage: bg
                }}>
                <div className={classes.ProfileCover__Data}>
                    <div    className={classes.ProfileCover__Data__Img}
                            style={{
                                backgroundImage: `url('${props.profile.avatarUrl}')`
                            }}>
                        {/* slika */}
                    </div>
                    <h2 className={classes.ProfileCover__Data__Name}>{`${props.profile.name} ${props.profile.surname}`}</h2>                
                    <div style={{marginRight: '3rem'}}>
                        <BtnPrimary size="big">
                            Follow
                        </BtnPrimary>
                    </div>
                </div>
            </div>
        );
    }

    return content
}

export default ProfileCover;

