import React from 'react';
import { connect } from 'react-redux'
import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'

import classes from './ProfileCover.scss'

const ProfileCover = (props) => {

    let bg = 'white'
    let avatar = 'white'
    let fullName = ''
    let follow = <div style={{width: "160px"}}></div>

    if(props.profile){
        bg = `linear-gradient(to bottom, transparent, rgba(0,0,0,.6)), url('${props.profile.coverUrl}')`;
        avatar = `url('${props.profile.avatarUrl}')`;
        fullName = `${props.profile.name} ${props.profile.surname}`
        if(props.user){
            if (props.user.following.indexOf(props.profile._id) != -1){
                follow = (
                    <BtnPrimary 
                        click={props.unfollowHandler}
                        size="big">
                        Unfollow
                    </BtnPrimary>
                )
            }else if(props.user._id != props.profile._id){
                follow = (
                    <BtnPrimary 
                        click={props.followHandler}
                        size="big">
                        Follow
                    </BtnPrimary>
                )
            }
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
                <div style={{marginRight: '3rem'}}>
                    {follow}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(ProfileCover);

