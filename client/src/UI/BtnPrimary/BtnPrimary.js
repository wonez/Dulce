import React from 'react'

import classes from './BtnPrimary.scss'

const BtnPrimary = (props) => {

    return(
        <button className={classes[props.size]}>
            {props.children}
        </button>
    );
}

export default BtnPrimary