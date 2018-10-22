import React, { Component } from 'react'

import classes from './Post.scss'

import Toolbar from '../../components/Toolbar/Toolbar'
import PostData from '../../components/PostData/PostData'
import Comments from '../../components/Comments/Comments'

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
                imgPath: 'src/assets/profile.jpg',
                profilePath: ''
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
            ],
            comments: [
                {
                    author: {
                        name: 'Edin Dzeko',
                        imgPath: 'src/assets/profile.jpg',
                        profilePath: 'src/assets/profile.jpg',
                    },
                    date: new Date(1533523708881),
                    content: 'Thanks a lot, I realy enjyoed this meal.'
                },
                {
                    author: {
                        name: 'John Doe',
                        imgPath: 'src/assets/profile.jpg',
                        profilePath: 'src/assets/profile.jpg',
                    },
                    date: new Date(1533923708881),
                    content: 'You are welcome my friend, any time'
                }
            ]
        }
    }

    render() {

        return (
            <div className={classes.Post}>
                <Toolbar />
                <div className={classes.Post__Container}>
                    <PostData item={this.state.item} />
                    <Comments comments={this.state.item.comments} />
                </div>
            </div>
        )
    }
}

export default Post;