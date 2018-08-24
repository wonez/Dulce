import React from 'react';

import Nav from './Nav/Nav';
import ButtonMain from '../../UI/ButtonMain/ButtonMain';

import cakeImg from '../../assets/woman-cake.jpg';

const Entry = () => {
    return(
        <div>
            <Nav />
            <div>
                <h1>
                    With over 1000 recepies added each day!
                </h1>
                <img alt="Photo by Ana Tavares on Unsplash" src={cakeImg}/>
            </div>
            <ButtonMain>Start preparing</ButtonMain>
        </div>
    );
}

export default Entry;