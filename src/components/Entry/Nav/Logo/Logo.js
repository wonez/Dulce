import React from 'react';

import IconCake from '../../../../UI/Icons/IconCake';

import classes from './Logo.scss';

const Logo = () => {
    return(
        <button className={classes.Logo}>
            <IconCake />
        </button>
    );
}

export default Logo;