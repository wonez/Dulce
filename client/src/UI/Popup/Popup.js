import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { showConfirmDialog } from '../../store/index'

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

        let content = null;

        if(!this.props.comment){
            content = (
                <Aux>
                    <input  ref={el => this.checkbox = el} 
                                    className={classes.Input} 
                                    type="checkbox" 
                                    id={`popup${this.props.post._id}`} />
                    <div    onClick={this.uncheck} 
                            className={classes.PopupBg}>
                    </div>
                    <div className={classes.Menu}>
                        <a onClick={() => {this.uncheck(); this.goTo(`/editpost`)}} className={classes.Menu__Link}>Edit</a>
                        <a onClick={() => {this.uncheck(); this.props.selectForDeletion(); this.props.showDialog()}} className={classes.Menu__Link}>Delete</a>
                    </div>
                    <label  htmlFor={`popup${this.props.post._id}`} 
                            className={classes.PopupBtn}>
                        <div className={classes.PopupIcon}>
                        </div>
                    </label>
                </Aux>
            )
        }else{
            content = (
                <Aux>
                    <input  ref={el => this.checkbox = el} 
                                    className={classes.Input} 
                                    type="checkbox" 
                                    id={`popup${this.props.data._id}`} />
                    <div    onClick={this.uncheck} 
                            className={classes.PopupBg}>
                    </div>
                    <div className={classes.Menu}>
                        <a onClick={() => {this.uncheck(); this.props.editComment()}} className={classes.Menu__Link}>Edit</a>
                        <a onClick={() => {this.uncheck(); this.props.showDialog(); this.props.selectForDeletion()}} className={classes.Menu__Link}>Delete</a>
                    </div>
                    <label  htmlFor={`popup${this.props.data._id}`} 
                            className={classes.PopupBtn}>
                        <div className={classes.PopupIcon}>
                        </div>
                    </label>
                </Aux>
            )
        }

        return(
            <div className={classes.Popup}>
                {content}       
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showDialog: () => dispatch(showConfirmDialog())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Popup));