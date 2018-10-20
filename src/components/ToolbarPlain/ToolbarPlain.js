import React from 'react'

import { IconCake } from '../../UI/Icons/Icons'
import IconButton from '../../UI/IconButton/IconButton'

import classes from './ToolbarPlain.scss'

const ToolbarPlain = (props) => {
    return(
        <div className={classes.Toolbar}>
            <div style={{display: 'inline-block'}}>
                <IconButton click={props.click}>
                    <IconCake /> <span>Dulce</span>
                </IconButton>
            </div>
        </div>
    )
}

export default ToolbarPlain;