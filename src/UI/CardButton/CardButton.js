import React from 'react';

import classes from './CardButton.scss';

const CardButton = props => (
    <button className={classes.CardButton}> 
        {props.children} 
    </button>
)

export default CardButton;