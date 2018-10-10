import React from 'react'

import classes from './Card.scss'

import Summary from '../Summary/Summary';
// import { IconClock, IconLevel, IconHeart } from '../../UI/Icons/Icons'

const Card = ({data, singlePost}) => {

    const date = data.date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});

    return(
        <div className={classes.Card}> 
            <div className={classes.Card__AuthorBox}>
                <div    className={classes.Card__Avatar} 
                        style={{backgroundImage: `url(${data.author.imgPath})`}}>
                    {/* slika */}
                </div>
                <div className={classes.Card__Data}>
                    <h5 className={classes.Card__Data__Name}>{data.author.name}</h5>
                    <p className={classes.Card__Data__Date}>{date}</p>
                </div>
            </div>
            <p className={classes.Card__Description} >
                {data.description}
            </p>
            <div className={classes.Card__Image} 
                style={{backgroundImage: `url(${data.imgPath})`}}>
                {/* slika */}
            </div>
            <h2 onClick={() => singlePost(data.heading)} className={classes.Card__Heading}>{data.heading} &rarr;</h2>
            <div style={{padding: '0 2rem'}}>
                <Summary    time={data.time} 
                            difficulty={data.difficulty}
                            hearts={data.hearts} />
            </div>
        </div>
    )
}

export default Card;