import React from 'react';
import { connect } from 'react-redux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './ProfileCover.scss'

const ProfileCover = (props) => {

    let bg = 'white'
    let avatar = 'white'
    let fullName = ''
    let follow = null

    if(props.profile){
        bg = `linear-gradient(to bottom, transparent, rgba(0,0,0,.6)), url('${props.profile.coverUrl}')`;
        avatar = `url('${props.profile.avatarUrl}')`;
        fullName = `${props.profile.name} ${props.profile.surname}`

        if(props.userId !== props.profile._id){
            follow = (
                <div style={{marginRight: '3rem'}}>
                    <BtnPrimary size="big">
                        Follow
                    </BtnPrimary>
                </div>
            )
        }
    }


    return(
        <div className={classes.ProfileCover}
            style={{
                backgroundImage: bg
            }}>
            <div className={classes.ProfileCover__Data}>
                <div    className={classes.ProfileCover__Data__Img}
                        style={{
                            backgroundImage: avatar
                        }}>
                    {/* slika */}
                </div>
                <h2 className={classes.ProfileCover__Data__Name}>{fullName}</h2>                
                {follow}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.user_id
    }
}

export default connect(mapStateToProps)(ProfileCover);

