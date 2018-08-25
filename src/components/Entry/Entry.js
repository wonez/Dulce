import React from 'react';

import Nav from './Nav/Nav';
import classes from './Entry.scss';
import typography from '../../_typography.scss';
import IconMagnifyingGlass from '../../UI/Icons/IconMagnifyingGlass';
import IconButton from '../../UI/IconButton/IconButton';

const Entry = () => {
    return(
        <div className={classes.Entry}>
            <div className={classes.Entry__Nav}>
                <Nav />
            </div>
            <div className={classes.Entry__Search}>
                <h1 className={[typography.HeadingMain, typography['margin-bottom-md']].join(' ')}>
                    New recepies added every day
                </h1>
                <div className={classes.Entry__Search__InputBox}>
                    <input className={classes.Entry__Search__Input} type="text" placeholder="e.g. Birthday Cake"></input>
                    <div className={classes.Entry__Search__Icon}>
                        <IconButton >
                            <IconMagnifyingGlass />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className={classes.Entry__Background}>
                <div className={classes.Entry__Background__Gradient}>
                </div>
                <div className={classes.Entry__Background__Img}>
                </div>
            </div>
        </div>
    );
}

export default Entry;