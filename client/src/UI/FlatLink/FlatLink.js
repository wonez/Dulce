import React from 'react';

import classes from './FlatLink.scss';

const FlatLink = (props) => {
    const classList = [classes.FlatLink, classes[props.kind] ];
    if(!props.validity){
        classList.push(classes['disabled'])
    }
    return(
        <button 
            className={classList.join(' ')}>
           {props.children} 
        </button>
    );
};

export default FlatLink;