import React, { Component } from 'react'
import { withRouter } from 'react-router' 

import Card from '../../components/Card/Card';

import classes from './Timeline.scss'

class Timeline extends Component {

    state = {
        items: [
            {
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
            },
            {
                author: {
                    name: 'John Doe',
                    imgPath: 'src/assets/profile.jpg'
                },
                date: new Date(1538983770888),
                description: 'New way to make new kind of pancakes. Easy to start, tastes perfect after first try already. Tastes like a chocolate while still having flavour of your favorite fruit.',
                imgPath: 'src/assets/mp-img-2.jpg',
                heading: 'Tiramisu',
                time: 25,
                difficulty: 'Beginner',
                hearts: 131
            }
        ]
    }

    singlePostHandler = (heading) => {
        const post = this.state.items.find( post => {
            return post.heading === heading
        })
        this.props.history.push({
            pathname: '/post',
            state: {
                item: post
            }
        });
    }


    render(){
        return(
            <div className={classes.Timeline}>
                {this.state.items.map(item => (
                    <Card  singlePost={this.singlePostHandler} data={item} key={item.heading}/>
                ))}
            </div>
        )
    }
}

export default withRouter(Timeline);