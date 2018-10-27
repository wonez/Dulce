import React from 'react'

import classes from './RoundedFormItem.scss'

class RoundedFormItem extends React.Component {

    render(){

        let input = null;

        if(this.props.type == 'input'){
            const classList = [classes.Input];
            if(this.props.touched){
                classList.push(classes[this.props.validity])
            }
            input = (
                <input  className={classList.join(' ')} 
                        type="text" 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder} />
            )
        } else if(this.props.type == 'textarea') {
            const classList = [classes.TextArea];
            if(this.props.touched){
                classList.push(classes[this.props.validity])
            }
            input = (
                <textarea   className={classList.join(' ')}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            placeholder={this.props.placeholder} >
                 </textarea>
            )
        } else if(this.props.type=='select'){
            input = (
                <div className={classes.Select}>
                    <select >
                        {this.props.options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.display}</option>
                            ))
                        }
                    </select>
                </div>
            )
        } else if(this.props.type=='number'){
            const classList = [classes.Number];
            if(this.props.touched){
                classList.push(classes[this.props.validity])
            }
            input = (
                <input  className={classList.join(' ')} 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}
                        min='1' max='999' type="number"></input>
            )
        } else if (this.props.type=='password'){
            const classList = [classes.Password];
            if(this.props.touched){
                classList.push(classes[this.props.validity])
            }
            input = (
                <input  className={classList.join(' ')} 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder} 
                        type="password"></input>
            )
        }

        let result = (
            <div className={classes.FormBox}>
                <label>{this.props.label}</label>
                {input}
            </div>
        )

        if(this.props.type=='preparation'){
            result = (
                <div className={classes.PreparationBox}>
                    <input placeholder={this.props.placeholder} type="text" className={classes.Preparation}/>
                    <div onClick={this.props.click} className={classes.Preparation__Button}>X</div>
                </div>
            )
        }

        return result
    }
}

export default RoundedFormItem;