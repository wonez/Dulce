import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'

import classes from './Create.scss'

class Create extends React.Component {
    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Container}>
                    <div className={classes.Create}>
                        
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Create;