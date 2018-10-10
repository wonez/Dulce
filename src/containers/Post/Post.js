import React, { Component } from 'react'

import classes from './Post.scss'

import Toolbar from '../../components/Toolbar/Toolbar'
import Summarry from '../../components/Summary/Summary'

class Post extends Component {

    // componentDidMount(){
    //     this.setState({
    //         item: this.props.location.state.item
    //     })
    // }

    state = {
        item: {
            author: {
                name: 'John Doe',
                imgPath: 'src/assets/profile.jpg'
            },
            date: new Date(1538983770888),
            description: 'New way to make new kind of pancakes. Easy to start, tastes perfect after first try already. Tastes like a chocolate while still having flavour of your favorite fruit.',
            imgPath: 'src/assets/mp-img-1.jpg',
            heading: 'Raspberry Pancakes',
            time: 25,
            difficulty: 'Beginner',
            hearts: 131,
            ingredients: [
                '3 cups all-purpose flour',
                '3 tablespoons white sugar',
                '3 teaspoons baking powder',
                '1 1/2 teaspoons baking soda',
                '3/4 teaspoon salt',
                '3 cups buttermilk',
                '1/2 cup milk',
                '3 eggs',
                '1/3 cup butter, melted'
            ],
            directions: [
                'In a large bowl, combine flour, sugar, baking powder, baking soda, and salt. In a separate bowl, beat together buttermilk, milk, eggs and melted butter. Keep the two mixtures separate until you are ready to cook.',
                "Heat a lightly oiled griddle or frying pan over medium high heat. You can flick water across the surface and if it beads up and sizzles, it's ready!",
                "Pour the wet mixture into the dry mixture, using a wooden spoon or fork to blend. Stir until it's just blended together. Do not over stir! Pour or scoop the batter onto the griddle, using approximately 1/2 cup for each pancake. Brown on both sides and serve hot."
            ]
        }
    }

    render() {

        const date = this.state.item.date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        return (
            <div className={classes.Post}>
                <Toolbar />
                <div className={classes.Post__Container}>
                    <div className={classes.Post__Data}>
                        <h2 className={classes.Post__Heading}>{this.state.item.heading}</h2>
                        <div className={classes.Post__Image}
                            style={{ backgroundImage: `url(${this.state.item.imgPath})` }} >
                            {/* slika */}
                        </div>
                        <div className={classes.Post__AuthorContainer}>
                            <div className={classes.Post__Author}>
                                <div className={classes.Post__Author__Avatar}
                                    style={{ backgroundImage: `url(${this.state.item.author.imgPath})` }} >
                                    {/* slika */}
                                </div>
                                <h4 className={classes.Post__Author__Name}>{this.state.item.author.name}</h4>
                            </div>
                            <p className={classes.Post__Date}>{date}</p>
                        </div>
                        <p className={classes.Post__Description}>
                            {this.state.item.description}
                        </p>
                        <div className={classes.Post__Preparation}>
                            <div className={classes.Post__Preparation__Ingredients}>
                                <h3 className={classes.Post__Preparation__Heading}>Ingredients</h3>
                                <ul className={classes.Post__Preparation__IngList}>
                                    {this.state.item.ingredients.map( ing => {
                                        return <li  className={classes.Post__Preparation__IngItem} 
                                                    key={ing}>
                                                        <span className={classes.Post__Preparation__ItemTag}>&gt;</span>
                                                        {ing}
                                                </li>
                                    })}
                                </ul>
                            </div>
                            <div className={classes.Post__Preparation__Directions}>
                                <h3 className={classes.Post__Preparation__Heading}>Directions</h3>                                
                                <ul className={classes.Post__Preparation__DirList}>
                                    {this.state.item.directions.map( (dir, i) => {
                                        return <li  className={classes.Post__Preparation__DescItem}
                                                    key={dir}>
                                                        <span className={classes.Post__Preparation__ItemTag}>{i+1}.</span>
                                                        {dir}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <Summarry   time={this.state.item.time} 
                                    difficulty={this.state.item.difficulty} 
                                    hearts={this.state.item.hearts} />
                    </div>
                    {/* comments */}
                </div>
            </div>
        )
    }
}

export default Post;