import React, { Component } from 'react'

import Toolbar from '../../components/Toolbar/Toolbar'
import Aux from '../../hoc/Aux'

import classes from './Page.scss'

class EditPost extends Component {
    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Container}>
                    <div className={classes.Page} style={{
                        minWidth: `${this.props.width}px`
                    }}>
                        {this.props.children}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default EditPost;
