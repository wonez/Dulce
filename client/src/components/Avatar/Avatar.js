import React from 'react'

import classes from './Avatar.scss'

const Avatar = ({url}) => {
    return(
        <div    className={classes.Avatar}
                style={{backgroundImage: `url(${url})`}} >
            {/* slika */}
        </div>
    );
}

export default Avatar;