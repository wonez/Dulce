import React from 'react';

import Nav from '../Nav/Nav';
import classes from './Entry.scss';
import typography from '../../_typography.scss';
import { IconMagnifyingGlass } from '../../UI/Icons/Icons';
import IconButton from '../../UI/IconButton/IconButton';

const Entry = (props) => {
    return(
        <section className={classes.Entry}>
            <nav className={classes.Entry__Nav}>
                <Nav />
            </nav>
            <main className={classes.Entry__Search}>
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
                <a  className={[classes.Entry__ShowAll, typography['margin-top-sm']].join(' ')}
                    onClick={props.handleCategories} >
                    Show all categories
                </a>
            </main>
            <div className={classes.Entry__Background}>
                <div className={classes.Entry__Background__Gradient}>
                </div>
                <div className={classes.Entry__Background__Img}>
                </div>
            </div>
        </section>
    );
}

export default Entry;