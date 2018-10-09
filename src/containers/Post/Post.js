import React, { Component } from 'react'

import classes from './Post.scss'

import Toolbar from '../../components/Toolbar/Toolbar'

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
            hearts: 131
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
                        {/* 
                        description
                        div
                            ingredients
                            steps */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;