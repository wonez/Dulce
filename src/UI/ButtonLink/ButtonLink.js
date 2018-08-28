import React from 'react';

import classes from './ButtonLink.scss';

const ButtonLink = props => (
    <button className={classes.ButtonLink}> 
        {props.children} 
    </button>
)

export default ButtonLink;