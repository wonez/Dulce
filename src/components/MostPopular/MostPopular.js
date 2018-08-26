import React from 'react';

import classes from './MostPopular.scss';
import typography from '../../_typography.scss'

import Card from './Card/Card';

const MostPopular = () => {

    const cards = [
        {
            img: 'https://cdn.pixabay.com/photo/2017/01/16/17/45/pancake-1984716_1280.jpg',
            heading: 'Raspberry Pancakes',
            time: 25,
            difficulty: 'Beginner',
            hearts: 131
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg',
            heading: 'Tiramisu',
            time: 45,
            difficulty: 'Hard',
            hearts: 176
        },
        {
            img: 'https://cdn.pixabay.com/photo/2014/05/23/23/17/dessert-352475_1280.jpg',
            heading: 'Strawberry Cupcakes',
            difficulty: 'Intermediate',
            time: 30,
            hearts: 97
        },
    ]

    return(
        <section id="most-popular" className={classes.MostPopular}>
            <h2 className={[typography['margin-bottom-lg'], typography['HeadingSecondary'], typography['text-center']].join(' ')} > 
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