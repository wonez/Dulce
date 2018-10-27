import React from 'react'

import classes from './Confirm.scss'
import FormButton from '../FormButton/FormButton';

class Confirm extends React.Component{

    state = {
        show: true
    }   

    dismissHandler = () => {
        this.setState({
            show: false
        })
    }

    render(){
        return(
            <div className={[classes.Modal, this.state.show ? null : classes.hide].join(' ')} onClick={this.dismissHandler}>
                <div className={classes.Box}>
                    <h2>Are you sure</h2>
                    <div className={classes.Btns}>
                        <FormButton type="danger">
                            Confirm
                        </FormButton>
                        <FormButton type="light" click={this.dismissHandler}>
                            Cancel
                        </FormButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm;