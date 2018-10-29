import React from 'react'

import { connect } from 'react-redux'

import classes from './Confirm.scss'
import FormButton from '../FormButton/FormButton';

import { hideConfirmDialog } from '../../store/index'

const Confirm = (props) => {

    const render = props.confirm ? (
        <div className={classes.Modal} onClick={props.hideConfirmDialog}>
            <div className={classes.Box} onClick={(e) => {e.stopPropagation()}}>
                <h2>Are you sure</h2>
                <div className={classes.Btns}>
                    <FormButton type="danger" click={() => { props.hideConfirmDialog(); props.confirmHandler() }}>
                        Confirm
                    </FormButton>
                    <FormButton type="light" click={props.hideConfirmDialog}>
                        Cancel
                    </FormButton>
                </div>
            </div>
        </div>
    ) : null;

    return render;
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