import React, { Component } from 'react'

import { connect } from 'react-redux'

import classes from './Confirm.scss'
import FormButton from '../FormButton/FormButton';

import { hideConfirmDialog } from '../../store/index'

class Confirm extends Component {

    render(){
        
        let render = null;

        if(this.props.confirm){

            render = (
                <div className={classes.Modal} onClick={this.props.hideConfirmDialog}>
                    <div className={classes.Box} onClick={(e) => {e.stopPropagation()}}>
                        <h2>Are you sure</h2>
                        <div className={classes.Btns}>
                            <FormButton type="danger" click={() => { this.props.hideConfirmDialog(); this.props.confirmHandler() }}>
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
        return render;
    }
}

const mapStateToProps = state => {
    return {
        confirm: state.ui.confirm
    }
}

const mapDispatchToProps = dispatch => {
    return{
        hideConfirmDialog: () => dispatch(hideConfirmDialog())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);