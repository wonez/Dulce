import React from 'react';
import classes from './CardSmall.scss';
import typography from '../../_typography.scss'

import { IconClock, IconLevel, IconHeart } from '../../UI/Icons/Icons';

const CardSmall = (props) => {
    const {card} = props;
    return(
        <figure className={classes.Card} onClick={props.click}>
            <div className={classes.Card__Img} style={{
                backgroundImage: `url(${card.imgUrl})`,
            }}> </div>
            <div className={classes.Card__Info}>
                <h4 className={[classes.Card__Heading, typography['margin-bottom-sm']].join(' ')} >{card.title}</h4>
                <div className={classes.Card__Summary}>
                    <p className={classes.Card__Summary__Icon}>
                        <IconClock/> &nbsp; {card.prepTime} min
                    </p>
                    <p className={classes.Card__Summary__Icon}>
                        <IconLevel /> &nbsp; {card.level.charAt(0).toUpperCase() + card.level.slice(1)}
                    </p>
                    <p className={classes.Card__Summary__Icon}> 
                         {card.likes} &nbsp; <IconHeart />
                    </p>
                </div>
            </div>
        </figure>
    );
}

export default CardSmall;