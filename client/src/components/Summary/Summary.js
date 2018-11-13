import React from 'react';

import { IconClock, IconLevel, IconHeart } from '../../UI/Icons/Icons'

import classes from './Summary.scss'

const Summary = ({ time, difficulty, hearts }) => {
    return(
        <div className={classes.Summary}>
            <p className={classes.Summary__Icon}> 
                <IconHeart /> 
                &nbsp; {hearts}
            </p>
            <p className={classes.Summary__Icon}>
                <IconClock/> &nbsp; {time} min
            </p>
            <p className={classes.Summary__Icon}>
                <IconLevel /> &nbsp; { difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
        </div>
    );
}

export default Summary;