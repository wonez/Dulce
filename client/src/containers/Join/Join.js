import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Join.scss';
import typography from '../../_typography.scss';
import { validateField, validateForm } from '../../utility/validate'

import FormItem from '../../UI/FormItem/FormItem';
import FlatLink from '../../UI/FlatLink/FlatLink';
import ToolbarPlain from '../../components/ToolbarPlain/ToolbarPlain'

import { tryLogin, trySignUp} from '../../store/creators/authCreators'

class Join extends Component {

    state ={ 
        signin: true,
        formSignIn: {
            fields: {
                email: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        minLength: 4
                    }
                }
            },
            valid: false
        },
        formSignUp : {
            fields: {
                name: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        minLength: 3
                    }
                },
                surname: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        minLength: 3
                    }
                },
                email: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    rules: {
                        required: true,
                        minLength: 4
                    }
                },
            },
            valid: false
        }
    }

    inputChanged = (form, field, value) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                [form] : {
                    ...prevState[form],
                    fields:{
                        ...prevState[form].fields,
                        [field] : {
                            ...prevState[form].fields[field],
                            value: value,
                            valid: validateField(prevState[form].fields[field]['rules'], value)
                        }
                    },
                }
            }
            newState[form].valid = validateForm(newState[form].fields);
            return newState
        })
    }

    handleSubmit = (e, form) => {
        e.preventDefault();
        if(this.state[form].valid){
            const formData = {}
            for(let field in this.state[form].fields){
                formData[field] = this.state[form].fields[field].value
            }
            if(form == 'formSignIn'){
                this.props.tryLogin(formData);
            } else if(form == 'formSignUp') {
                this.props.trySignUp(formData);
            }
        }
    }

    goHome = () => {
        this.props.history.push('/')
    }

    render(){

        let form = (
            <form   noValidate 
                    onSubmit={(e) => this.handleSubmit(e, 'formSignIn')}>
                <FormItem   type="email"
                            value={this.state.formSignIn.fields.email.value}
                            onChange={(e) => this.inputChanged('formSignIn', 'email', e.target.value)}
                            label="Email"
                            validity={this.state.formSignIn.fields.email.valid ? 'valid' : 'invalid'} 
                            />

                <FormItem   type="password"
                            value={this.state.formSignIn.fields.password.value}
                            onChange={(e) => this.inputChanged('formSignIn', 'password', e.target.value)}
                            label="Password"
                            validity={this.state.formSignIn.fields.password.valid ? 'valid' : 'invalid'} 
                            />
                {
                    this.props.loading ? 
                    <h2>Loading...</h2> : 
                    <FlatLink validity={this.state.formSignIn.valid} kind='light' >Sign in</FlatLink>
                }
                <hr style={{margin: '2.5rem 0'}}/>
                <FlatLink validity kind='primary' >Continue Using Facebook</FlatLink>
                <FlatLink validity kind='danger'>Continue Using Google+</FlatLink>
            </form>
        )

        if(!this.state.signin){
            form = (
                <form onSubmit={(e) => this.handleSubmit(e, 'formSignUp')}>
                    <FormItem   type="text"
                                label="Name"
                                value={this.state.formSignUp.fields.name.value}
                                onChange={(e) => this.inputChanged('formSignUp', 'name', e.target.value)}
                                validity={this.state.formSignUp.fields.name.valid ? 'valid' : 'invalid'} 
                                />
                    <FormItem   type="text"
                                label="Surname"
                                value={this.state.formSignUp.fields.surname.value}
                                onChange={(e) => this.inputChanged('formSignUp', 'surname', e.target.value)}
                                validity={this.state.formSignUp.fields.surname.valid ? 'valid' : 'invalid'}  
                                />

                    <FormItem   type="email" 
                                label="Email"
                                value={this.state.formSignUp.fields.email.value}
                                onChange={(e) => this.inputChanged('formSignUp', 'email', e.target.value)}
                                validity={this.state.formSignUp.fields.email.valid ? 'valid' : 'invalid'} 
                                />
                    <FormItem   type="password" 
                                label="Password"
                                value={this.state.formSignUp.fields.password.value}
                                onChange={(e) => this.inputChanged('formSignUp', 'password', e.target.value)}
                                validity={this.state.formSignUp.fields.password.valid ? 'valid' : 'invalid'} 
                                />
                    {
                        this.props.loading ? 
                        <h2>Loading...</h2> : 
                        <FlatLink validity={this.state.formSignUp.valid} kind='light'>Sign up</FlatLink>
                    }
                    <hr style={{margin: '2.5rem 0'}}/>
                    <FlatLink validity kind='primary'>Continue Using Facebook</FlatLink>
                    <FlatLink validity kind='danger'>Continue Using Google+</FlatLink>
                </form>
            )
        }

        const signinClasses = [classes.Signin__Options__Btn];
        const signupClasses = [classes.Signin__Options__Btn];

        if(this.state.signin){
            signinClasses.push(classes.Signin__Options__Btn__Active);
        }else{
            signupClasses.push(classes.Signin__Options__Btn__Active);
        }

        let redirect = null;

        if(this.props.isLogged){
            const to = this.props.location.state ? this.props.location.state.from.pathname : '/profile';
            redirect = <Redirect to={to}/> 
        }
        
        return(
            <div className={classes.Signin}>
                {redirect}
                <ToolbarPlain click={this.goHome}/>
                <div className={classes.Signin__Form}>
                    <div className={classes.Signin__Options}>
                        <button className={signinClasses.join(' ')} 
                            onClick={()=>{this.setState({signin: true})}}>Sign in</button>
                        <button className={signupClasses.join(' ')} onClick={()=>{this.setState({signin: false})}}>Sign up</button>
                    </div>
                    {form}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged,
        loading: state.ui.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryLogin: (userData) => dispatch(tryLogin(userData)),
        trySignUp: (userData) => dispatch(trySignUp(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Join));