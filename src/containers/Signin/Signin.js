import React, { Component } from 'react';

import classes from './Signin.scss';
import typography from '../../_typography.scss';

import { IconCake } from '../../UI/Icons/Icons';
import IconButton from '../../UI/IconButton/IconButton';
import FormItem from '../../UI/FormItem/FormItem';
import FlatLink from '../../UI/FlatLink/FlatLink';

class Signin extends Component {

    state ={ 
        signin: true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submited');
    }

    render(){

        let form = (
            <form onSubmit={this.handleSubmit}>
                <FormItem   type="email"
                            label="Email" 
                            required
                            />

                <FormItem   type="password" 
                            label="Password"
                            required
                            />

                <FlatLink type='submit' kind='light' to='profile'>Sign in</FlatLink>
                <hr style={{margin: '2.5rem 0'}}/>
                <FlatLink kind='dark' to='fb'>Continue Using Facebook</FlatLink>
                <FlatLink kind='primary' to='ggl'>Continue Using Google+</FlatLink>
            </form>
        )

        if(!this.state.signin){
            form = (
                <form onSubmit={this.handleSubmit}>
                    <FormItem   type="text"
                                label="Name" 
                                required
                                />
                    <FormItem   type="text"
                                label="Surname" 
                                required
                                />

                    <FormItem   type="email" 
                                label="Email"
                                required
                                />
                    <FormItem   type="password" 
                                label="Password"
                                required
                                />

                    <FlatLink type='submit' kind='light' to='oo'>Sign up</FlatLink>
                    <hr style={{margin: '2.5rem 0'}}/>
                <FlatLink kind='dark' to='fb'>Continue Using Facebook</FlatLink>
                <FlatLink kind='primary' to='ggl'>Continue Using Google+</FlatLink>
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

        return(
            <div className={classes.Signin}>
                <div className={classes.Signin__Toolbar}>
                    <IconButton>
                        <IconCake /> <span>Dulce</span>
                    </IconButton>
                </div>

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

export default Signin;