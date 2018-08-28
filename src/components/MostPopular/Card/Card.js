import React from 'react';

import CardButton from '../../../UI/CardButton/CardButton';

import classes from './Card.scss';
import typography from '../../../_typography.scss';

import { IconClock, IconLevel, IconHeart } from '../../../UI/Icons/Icons';

const Card = (props) => {
    const {card} = props;
    return(
        <figure className={classes.Card}>
            <div className={classes.Card__Img} style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover'
            }} src={card.img}> </div>
            <div className={classes.Card__Info}>
                <h4 className={[classes.Card__Heading, typography['margin-bottom-sm']].join(' ')} >{card.heading}</h4>
                <div className={classes.Card__Summary}>
                    <p className={classes.Card__Summary__Icon}>
                        <IconClock/> &nbsp; {card.time} min
                    </p>
                    <p className={classes.Card__Summary__Icon}>
                        <IconLevel /> &nbsp; {card.difficulty}
                    </p>
                    <p className={classes.Card__Summary__Icon}> 
                         {card.hearts} &nbsp; <IconHeart />
                    </p>
                </div>
                <div className={[typography['margin-bottom-sm'], typography['margin-top-sm'], typography['text-center']].join(' ')}>
                    <CardButton>Read more</CardButton>
                </div>
            </div>
        </figure>
    );
}

export default Card;