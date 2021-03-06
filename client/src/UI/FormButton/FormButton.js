import React from 'react'

import classes from './FormButton.scss'

const FormButton = (props) => {
    return(
        <button onClick={props.click} 
                disabled={props.disabled}
                className={[classes.Btn, classes[props.type]].join(' ')} >
            {props.children}
        </button>
    )
}

export default FormButton;