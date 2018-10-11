import React from 'react'

import classes from './PostData.scss'

import Summary from '../Summary/Summary';

const PostData = (props) => {

    const date = props.item.date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className={classes.Data}>
            <h2 className={classes.Data__Heading}>{props.item.heading}</h2>
            <div className={classes.Data__Image}
                style={{ backgroundImage: `url(${props.item.imgPath})` }} >
                {/* slika */}
            </div>
            <div className={classes.Data__AuthorContainer}>
                <div className={classes.Data__Author}>
                    <div className={classes.Data__Author__Avatar}
                        style={{ backgroundImage: `url(${props.item.author.imgPath})` }} >
                        {/* slika */}
                    </div>
                    <h4 className={classes.Data__Author__Name}>{props.item.author.name}</h4>
                </div>
                <p className={classes.Data__Date}>{date}</p>
            </div>
            <p className={classes.Data__Description}>
                {props.item.description}
            </p>
            <div className={classes.Data__Preparation}>
                <div className={classes.Data__Preparation__Ingredients}>
                    <h3 className={classes.Data__Preparation__Heading}>Ingredients</h3>
                    <ul className={classes.Data__Preparation__IngList}>
                        {props.item.ingredients.map(ing => {
                            return <li className={classes.Data__Preparation__IngItem}
                                key={ing}>
                                <span className={classes.Data__Preparation__ItemTag}>&gt;</span>
                                {ing}
                            </li>
                        })}
                    </ul>
                </div>
                <div className={classes.Data__Preparation__Directions}>
                    <h3 className={classes.Data__Preparation__Heading}>Directions</h3>
                    <ul className={classes.Data__Preparation__DirList}>
                        {props.item.directions.map((dir, i) => {
                            return <li className={classes.Data__Preparation__DescItem}
                                key={dir}>
                                <span className={classes.Data__Preparation__ItemTag}>{i + 1}.</span>
                                {dir}</li>
                        })}
                    </ul>
                </div>
            </div>
            <Summary time={props.item.time}
                difficulty={props.item.difficulty}
                hearts={props.item.hearts} />
        </div>
    )
}

export default PostData;