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
        } else if(this.props.type=='select'){
            input = (
                <div className={classes.Select}>
                    <select >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            )
        } else if(this.props.type=='number'){
            input = (
                <input  className={classes.Number} placeholder={this.props.placeholder}
                        min='1' max='999' type="number"></input>
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