import React from 'react';

import classes from './MostPopular.scss';
import typography from '../../../_typography.scss'

import Card from './Card/Card';

const MostPopular = () => {

    const cards = [
        {
            img: 'src/assets/mp-img-1.jpg',
            heading: 'Raspberry Pancakes',
            time: 25,
            difficulty: 'Beginner',
            hearts: 131
        },
        {
            img: 'src/assets/mp-img-2.jpg',
            heading: 'Tiramisu',
            time: 45,
            difficulty: 'Hard',
            hearts: 176
        },
        {
            img: 'src/assets/mp-img-3.jpg',
            heading: 'Strawberry Cupcakes',
            difficulty: 'Intermediate',
            time: 30,
            hearts: 97
        },
    ]

    return(
        <section id="most-popular" className={classes.MostPopular}>
            <h2 className={[typography['margin-bottom-md'], typography['HeadingSecondary'], typography['text-center']].join(' ')} > 
                Most Popular
            </h2>
            <div className={classes.MostPopular__Cards}>
                {cards.map( (card)=> (
                    <Card card={card} key={card.time} />
                ))}
            </div>
        </section>
    )
}

export default MostPopular;