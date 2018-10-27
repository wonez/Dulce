import React from 'react'

import classes from './Loading.scss'

const Loading = () => {

    return(
        <div className={[classes.Modal, classes.show].join(' ')}>
            <div className={classes.Spinner}>
            </div>
        </div>
    )
}

export default Loading;