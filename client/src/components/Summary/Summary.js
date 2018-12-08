import React from 'react';

import { connect } from 'react-redux'
import { IconClock, IconLevel, IconHeart } from '../../UI/Icons/Icons'

import classes from './Summary.scss'

const Summary = (props) => {

    let liked = ''
    if(props.user){
        liked = props.hearts.indexOf(props.user._id) != -1 ? classes.Liked : '';
    }

    let content = (
        <div className={classes.Summary}>
            <p onClick={props.handleLike} className={[classes.Summary__Icon, liked].join(' ')}> 
                <IconHeart /> 
                &nbsp; {props.hearts.length}
            </p>
            <p className={classes.Summary__Icon}>
                <IconClock/> &nbsp; {props.time} min
            </p>
            <p className={classes.Summary__Icon}>
                <IconLevel /> &nbsp; { props.difficulty.charAt(0).toUpperCase() + props.difficulty.slice(1)}
            </p>
        </div>
    )

    if(props.small){
        content = (
            <div className={classes.SummarySmall}>
                <p className={classes.SummarySmall__Icon}>
                    <IconClock/> &nbsp; {props.time} min
                </p>
                <p className={classes.SummarySmall__Icon}>
                    <IconLevel /> &nbsp; {props.difficulty.charAt(0).toUpperCase() + props.difficulty.slice(1)}
                </p>
                <p className={[classes.SummarySmall__Icon, liked].join(' ')}> 
                    {props.hearts.length} &nbsp; <IconHeart />
                </p>
            </div>
        )
    }

    return content;
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Summary);