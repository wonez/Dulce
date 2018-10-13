import React, { Component } from 'react';

import classes from './LearnMore.scss';
import typography from '../../../_typography.scss';

import { Redirect } from 'react-router-dom';

import LinkButton from '../../../UI/LinkButton/LinkButton';

class LearnMore extends Component{

    constructor(){
        super();
        this.state = {
            signIn: false
        }
    }

    render(){
        return(
            <div id='learn-more' className={classes.LearnMore}>
                <div className={classes.LearnMore__TextBox}>
                    <h3 className={classes.LearnMore__Heading}>Learn More</h3>
                    <p className={classes.LearnMore__Paragraph}>
                        Dulce is a social network designed with people passionate for sweets in mind. Dulce gives you ability to learn sugar full recepies from users around the world.
                    </p>
                    <p className={classes.LearnMore__Paragraph}>
                        Not only that, but to meet new people and cultures. To express your feelings about certain recepie and many other things.
                    </p>
                    <p className={classes.LearnMore__Paragraph}>You can help Dulce by sharing recepies you know or simple by voting for recepies you find interesting.</p>
                    <LinkButton click={()=> { this.setState({signIn: true})}}> 
                        Join now &rarr;
                    </LinkButton>
                    { this.state.signIn ? <Redirect to='/signin' /> : null }
                </div>
            </div>
        );
    }
}

export default LearnMore