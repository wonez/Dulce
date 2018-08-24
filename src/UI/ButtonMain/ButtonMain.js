import React from 'react';

import classes from './ButtonMain';

const ButtonMain = (props) => {
    return(
        <button className={classes.ButtonMain} onClick={props.click} >
            {props.children}
        </button>
    );
}

export default ButtonMain;