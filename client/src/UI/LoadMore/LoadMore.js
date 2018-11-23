import React from 'react'

import classes from './LoadMore.scss'

const LoadMore = (props) => {
    return(
        <a  className={classes.LoadMore} 
            onClick={props.click}>Load More</a>
    )
}

export default LoadMore;