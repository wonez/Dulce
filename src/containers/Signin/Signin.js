import React, { Component } from 'react';

import classes from './Signin.scss';
import typography from '../../_typography.scss';

import MainButton from '../../UI/MainButton/MainButton';
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

                <FlatLink type='submit' kind='light' to='oo'>Sign in</FlatLink>
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

                    <FlatLink type='submit' kind='light' to='oo'>Sign in</FlatLink>
                </form>
            )
        }

        return(
            <div className={classes.Signin}>
                <div className={classes.Signin__Form}>
                    <div className={classes.Signin__Options}>
                        <button className={classes.Signin__Options__Btn} onClick={()=>{this.setState({signin: true})}}>Sign in</button>
                        <button className={classes.Signin__Options__Btn} onClick={()=>{this.setState({signin: false})}}>Sign up</button>
                    </div>
                    {form}
                </div>
                {/* <h2 className={classes.Signin__Text}>
                    More than 10K sweet recepies are waiting to be tasted and explored.
                </h2> */}
            </div>
        )
    }
}

export default Signin;