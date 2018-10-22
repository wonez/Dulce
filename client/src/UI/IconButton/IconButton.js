import React from 'react';

import classes from './IconButton.scss';

const IconButton = (props) => {
    return(
        <a onClick={props.click} className={classes.IconButton}>
            {props.children}
        </a>
    )
}

export default IconButton;