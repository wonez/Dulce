import React from 'react'

import { connect } from 'react-redux'

import classes from './Confirm.scss'
import FormButton from '../FormButton/FormButton';

import { hideConfirmDialog } from '../../store/index'

class Confirm extends React.Component{

    render(){
        return(
            <div className={classes.Modal} onClick={this.props.hideConfirmDialog}>
                <div className={classes.Box} onClick={(e) => {e.stopPropagation()}}>
                    <h2>Are you sure</h2>
                    <div className={classes.Btns}>
                        <FormButton type="danger" click={this.props.hideConfirmDialog}>
                            Confirm
                        </FormButton>
                        <FormButton type="light" click={this.props.hideConfirmDialog}>
                            Cancel
                        </FormButton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        hideConfirmDialog: () => dispatch(hideConfirmDialog())
    }
}

export default connect(null, mapDispatchToProps)(Confirm);