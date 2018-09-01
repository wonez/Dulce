import React from 'react';

import classes from './LinkButton.scss';

const LinkButton = props => (
    <button className={classes.LinkButton} onClick={props.click}> 
        {props.children} 
    </button>
)

export default LinkButton;