import React from 'react';

import { IconCake } from '../Icons/Icons';

import classes from './Logo.scss';

const Logo = () => {
    return(
        <button className={classes.Logo}>
            <IconCake />
        </button>
    );
}

export default Logo;