import React from 'react'

import classes from './NothingToShow.scss'

import { IconCake, IconUser } from '../../UI/Icons/Icons'

const NothingToShow = (props) => {

    let icon = null
    
    if(props.icon == 'user'){
        icon = <IconUser />
    } else if(props.icon == 'post'){
        icon = <IconCake />
    }

    return(
        <div className={classes.NothingToShow}>
            <div className={classes.NothingToShow__Icon}>
                {icon}
            </div>
            <p>{props.message}</p>
        </div>
    )
}

export default NothingToShow;