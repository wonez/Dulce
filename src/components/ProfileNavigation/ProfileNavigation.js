import React from 'react'

import classes from './ProfileNavigation.scss'

const ProfileNavigation = ({handler, active}) => {
    return (
        <div className={classes.ProfileNavigation}>
            <a  onClick={() => {handler('timeline')}} 
                className={[classes.ProfileNavigation__Btn, active === 'timeline' ? classes.ProfileNavigation__active : null].join(' ')}>
                Timeline
            </a>
            <a onClick={() => {handler('following')}} 
                className={[classes.ProfileNavigation__Btn, active === 'following' ? classes.ProfileNavigation__active : null].join(' ')}>
                Following
            </a>
            <a onClick={() => {handler('about')}} 
                className={[classes.ProfileNavigation__Btn, active === 'about' ? classes.ProfileNavigation__active : null].join(' ')}>
                About
            </a>
        </div>
    )
}

export default ProfileNavigation;