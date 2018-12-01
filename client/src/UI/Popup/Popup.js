import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from '../../utility/axios'
import { showConfirmDialog, startLoading, endLoading } from '../../store/index'

import Confirm from '../Confirm/Confirm'
import Loading from '../Loading/Loading'

import classes from './Popup.scss' 
import Aux from '../../hoc/Aux';

class Popup extends Component {

    uncheck = () => {
        this.checkbox.checked = false;
    }

    goTo = (url) => {
        this.props.history.replace({
            pathname: url,
            state: this.props.post
        })
    }

    render(){
        return(
            <Aux>
                <div className={classes.Popup}>
                    <input  ref={el => this.checkbox = el} 
                            className={classes.Input} 
                            type="checkbox" 
                            id={`popup${this.props.post._id}`} />
                    <div    onClick={this.uncheck} 
                            className={classes.PopupBg}>
                    </div>
                    <div className={classes.Menu}>
                        <a onClick={() => {this.uncheck(); this.goTo(`/editpost`)}} className={classes.Menu__Link}>Edit Post</a>
                        <a onClick={() => {this.uncheck(); this.props.selectForDeletion(); this.props.showDialog()}} className={classes.Menu__Link}>Delete Post</a>
                    </div>
                    <label  htmlFor={`popup${this.props.post._id}`} 
                            className={classes.PopupBtn}>
                        <div className={classes.PopupIcon}>
                        </div>
                    </label>
                </div>
            </Aux>        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showDialog: () => dispatch(showConfirmDialog())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Popup));