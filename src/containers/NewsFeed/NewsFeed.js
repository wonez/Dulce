import React from 'react'

import Toolbar from '../../components/Toolbar/Toolbar';
import Card from '../../components/Card/Card';
import Aux from '../../hoc/Aux'

import classes from './NewsFeed.scss'

class NewsFeed extends React.Component {

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
                    name: 'Edin Dzeko',
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

    handleSinglePost = (heading) => {
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
            <Aux>
                <Toolbar />
                <div className={classes.NewsFeed} >
                    {this.state.items.map( item => {
                        return <Card    key={item.heading}
                                        data={item} 
                                        singlePost={this.handleSinglePost} />
                    })}
                </div>
            </Aux>
        );
    }
}

export default NewsFeed;