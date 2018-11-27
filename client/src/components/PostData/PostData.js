import React from 'react'

import classes from './PostData.scss'

import Summary from '../Summary/Summary';

const PostData = (props) => {

    let date = ''
    let authorImg = ''
    let authorName = ''
    let ingredients = ''
    let directions = ''
    let summary = ''

    if(props.item.title){
        date = new Date(props.item.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });   
        authorImg = props.item.author.avatarUrl;
        authorName = props.item.author.name + ' ' + props.item.author.surname

        ingredients = props.item.ingredients.map((ing, i) => {
            return (
                <li className={classes.Data__Preparation__IngItem}
                    key={ing + i}>
                    <span className={classes.Data__Preparation__ItemTag}>&gt;</span>
                    {ing}
                </li>
            )
        })

        directions = props.item.directions.map((dir, i) => {
            return (
                <li className={classes.Data__Preparation__DescItem}
                    key={dir + i}>
                    <span className={classes.Data__Preparation__ItemTag}>{i + 1}.</span>
                    {dir}
                </li>
            )
        })
        summary = (
            <Summary 
                handleLike={props.handleLike}
                time={props.item.prepTime}
                difficulty={props.item.level}
                hearts={props.item.likes} />
        )
    } 

    return (
        <div className={classes.Data}>
            <h2 className={classes.Data__Heading}>{props.item.title}</h2>
            <div className={classes.Data__Image}
                style={{ backgroundImage: `url(${props.item.imgUrl})` }} >
                {/* slika */}
            </div>
            <div className={classes.Data__AuthorContainer}>
                <div className={classes.Data__Author}>
                    <div className={classes.Data__Author__Avatar}
                        style={{ backgroundImage: `url(${authorImg})` }} >
                        {/* slika */}
                    </div>
                    <h4 onClick={props.handleUser} className={classes.Data__Author__Name}>{authorName}</h4>
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
                        {ingredients}
                    </ul>
                </div>
                <div className={classes.Data__Preparation__Directions}>
                    <h3 className={classes.Data__Preparation__Heading}>Directions</h3>
                    <ul className={classes.Data__Preparation__DirList}>
                        {directions}
                    </ul>
                </div>
            </div>
            {summary}
        </div>
    )
}

export default PostData;