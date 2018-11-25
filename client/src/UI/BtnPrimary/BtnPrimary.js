import React from 'react'

import classes from './BtnPrimary.scss'

const BtnPrimary = (props) => {

    return(
        <button 
                disabled={props.disabled}
                onClick={props.click} 
                className={classes[props.size]}>
            {props.children}
        </button>
    );
}

export default BtnPrimary