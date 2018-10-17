import React from 'react'

import classes from './RoundedFormItem.scss'

class RoundedFormItem extends React.Component {

    render(){

        let input = null;

        if(this.props.type == 'input'){
            input = (
                <input className={classes.Input} type="text" placeholder={this.props.placeholder} />
            )
        } else if(this.props.type == 'textarea') {
            input = (
                <textarea className={classes.TextArea} placeholder={this.props.placeholder} ></textarea>
            )
        }

        return(
            <div className={classes.FormBox}>
                <label>{this.props.label}</label>
                {input}
            </div>
        )
    }
}

export default RoundedFormItem;