import React from 'react';

import classes from './MainButton.scss';

const MainButton = props => (
    <button className={classes.MainButton}> 
        {props.children} 
    </button>
)

export default MainButton;