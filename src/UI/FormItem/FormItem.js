import React from 'react';

import classes from './FormItem.scss';

const FormItem = (props) => {
    return(
        <div className={classes.FormItem}>
            <input placeholder={props.label} className={classes.FormItem__Input} {...props}/>
            <label className={classes.FormItem__Label} >{props.label}</label>
        </div>
    )
}

export default FormItem;