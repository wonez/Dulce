import React from 'react';

import Logo from '../../UI/Logo/Logo'
import classes from './Nav.scss';

import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <div className={classes.Nav}>
            <Logo />
            <ul className={classes.Nav__Items}>
                <li className={classes.Nav__Item}>
                    <a href="/categories" className={classes.Nav__Link}>
                        Categories
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <Link to='/join' className={classes.Nav__Link}>
                        Join now
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;