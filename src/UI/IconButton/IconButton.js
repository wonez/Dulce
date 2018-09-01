import React from 'react';

import classes from './IconButton.scss';

const IconButton = (props) => {
    return(
        <a className={classes.IconButton}>
            {props.children}
        </a>
    )
}

export default IconButton;