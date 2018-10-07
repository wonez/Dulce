import React from 'react'

import classes from './ProfileNavigation.scss'

const ProfileNavigation = () => {
    return (
        <div className={classes.ProfileNavigation}>
            {/* <h2 className={classes.ProfileNavigation__Name}>Don Joe</h2> */}
            {/* <div className={classes.ProfileNavigation__BtnContainer}> */}
                <a className={classes.ProfileNavigation__Btn}>
                    Timeline
                </a>
                <a className={classes.ProfileNavigation__Btn}>
                    Following
                </a>
                <a className={classes.ProfileNavigation__Btn}>
                    About
                </a>
            {/* </div> */}
        </div>
    )
}

export default ProfileNavigation;