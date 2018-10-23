import React from 'react';

import classes from './FormItem.scss';

const FormItem = (props) => {
    return(
        <div className={classes.FormItem}>
            <input 
                type={props.type}
                placeholder={props.label} 
                className={[classes.FormItem__Input, classes[props.validity]].join(' ')} 
                value={props.value}
                onChange={props.onChange}
                />
            <label className={classes.FormItem__Label} >{props.label}</label>
        </div>
    )
}

export default FormItem;