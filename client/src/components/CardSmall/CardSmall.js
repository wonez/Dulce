import React from 'react';
import classes from './CardSmall.scss';
import typography from '../../_typography.scss'

import Summary from '../Summary/Summary';

const CardSmall = (props) => {
    const {card} = props;
    return(
        <figure className={classes.Card} onClick={props.click}>
            <div className={classes.Card__Img} style={{
                backgroundImage: `url(${card.imgUrl})`,
            }}> </div>
            <div className={classes.Card__Info}>
                <h4 className={[classes.Card__Heading, typography['margin-bottom-sm']].join(' ')} >{card.title}</h4>
                <Summary    time={card.prepTime}
                            difficulty={card.level}
                            hearts={card.likes}
                            small
                            />
            </div>
        </figure>
    );
}

export default CardSmall;