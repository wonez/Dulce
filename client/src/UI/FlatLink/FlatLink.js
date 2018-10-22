import React from 'react';

import { Link } from 'react-router-dom';

import classes from './FlatLink.scss';

const FlatLink = (props) => {
    return(
        <Link to={props.to} {...props} className={[classes.FlatLink, classes[props.kind]].join(' ')}>
           {props.children} 
        </Link>
    );
};

export default FlatLink;