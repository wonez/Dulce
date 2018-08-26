import React from 'react';

import Logo from '../../../UI/Logo/Logo';
import classes from './Nav.scss';

const Nav = () => {
    return(
        <div className={classes.Nav}>
            <Logo />
            <ul className={classes.Nav__Items}>
                <li className={classes.Nav__Item}>
                    <a href="#" className={classes.Nav__Link}>
                        Show categories
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <a href="#most-popular" className={classes.Nav__Link}>
                        Most popular
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <a href="#" className={classes.Nav__Link}>
                        Learn more
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <a href="#" className={classes.Nav__Link}>
                        Sign up
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <a href="#" className={classes.Nav__Link}>
                        Sign in
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Nav;