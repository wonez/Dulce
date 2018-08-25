import React from 'react';

import classes from './IconButton.scss';

const IconButton = (props) => {
    return(
        <button className={classes.IconButton}>
            {props.children}
        </button>
    )
}

export default IconButton;