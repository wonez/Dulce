import React from 'react';

import Logo from '../../../../UI/Logo/Logo';
import classes from './Nav.scss';

import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <div className={classes.Nav}>
            <Logo />
            <ul className={classes.Nav__Items}>
                {/* <li className={classes.Nav__Item}>
                    <a href="#most-popular" className={classes.Nav__Link}>
                        Most popular
                    </a>
                </li> */}
                <li className={classes.Nav__Item}>
                    <a href="/allcategories" className={classes.Nav__Link}>
                        Categories
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <a href="#learn-more" className={classes.Nav__Link}>
                        Learn more
                    </a>
                </li>
                <li className={classes.Nav__Item}>
                    <Link to='/signin' className={classes.Nav__Link}>
                        Join now
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;