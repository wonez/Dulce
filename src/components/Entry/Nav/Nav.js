import React from 'react';

import classes from './Nav';

const Nav = () => {
    return(
        <ul className={classes.Nav}>
            <li>most popular</li>
            <li>laern more</li>
            <li>sign up</li>
            <li>log in</li>
        </ul>
    )
}

export default Nav;