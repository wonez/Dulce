import React from 'react';

import { IconClock, IconLevel, IconHeart } from '../../UI/Icons/Icons'

import classes from './Summary.scss'

const Summary = ({ time, difficulty, hearts, small }) => {

    let content = (
        <div className={classes.Summary}>
            <p className={classes.Summary__Icon}> 
                <IconHeart /> 
                &nbsp; {hearts.length}
            </p>
            <p className={classes.Summary__Icon}>
                <IconClock/> &nbsp; {time} min
            </p>
            <p className={classes.Summary__Icon}>
                <IconLevel /> &nbsp; { difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
        </div>
    )

    if(small){
        content = (
            <div className={classes.SummarySmall}>
                <p className={classes.SummarySmall__Icon}>
                    <IconClock/> &nbsp; {time} min
                </p>
                <p className={classes.SummarySmall__Icon}>
                    <IconLevel /> &nbsp; {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </p>
                <p className={classes.SummarySmall__Icon}> 
                    {hearts.length} &nbsp; <IconHeart />
                </p>
            </div>
        )
    }

    return content;
}

export default Summary;