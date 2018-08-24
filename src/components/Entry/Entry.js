import React from 'react';

import Nav from './Nav/Nav';
import ButtonMain from '../../UI/ButtonMain/ButtonMain';

import classes from './Entry.scss';

import cakeImg from '../../assets/woman-cake.jpg';

const Entry = () => {
    return(
        <div className={classes.Entry}>
            <Nav />
            <div className={classes.Entry__Banner}>
                <h1>
                    With over 1000 recepies added each day!
                </h1>
                <img className={classes.Entry__Banner__img} alt="Photo by Ana Tavares on Unsplash" src={cakeImg}/>
            </div>
            <ButtonMain>Start preparing</ButtonMain>
        </div>
    );
}

export default Entry;