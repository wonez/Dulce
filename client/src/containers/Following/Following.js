import React, { Component } from 'react'

import classes from './Following.scss';

import Person from '../../components/Person/Person'

class Following extends Component{

    state = {
        people: [
            {
                name: 'Ben Franklin',
                followers: 1589,
                imgPath: 'src/assets/profile.jpg',
                id: 1,
            },
            {
                name: 'JJ Thompson',
                followers: 2314,
                imgPath: 'src/assets/profile.jpg',
                id: 2,
            },
            {
                name: 'Bjarne Stroustrup',
                followers: 512,
                imgPath: 'src/assets/profile.jpg',
                id: 3
            },
            {
                name: 'Ben Franklin',
                followers: 1589,
                imgPath: 'src/assets/profile.jpg',
                id: 4
            },
            {
                name: 'JJ Thompson',
                followers: 2314,
                imgPath: 'src/assets/profile.jpg',
                id: 5
            },
            {
                name: 'Bjarne Stroustrup',
                followers: 512,
                imgPath: 'src/assets/profile.jpg',
                id: 6
            },
            {
                name: 'Ben Franklin',
                followers: 1589,
                imgPath: 'src/assets/profile.jpg',
                id: 7
            },
            {
                name: 'JJ Thompson',
                followers: 2314,
                imgPath: 'src/assets/profile.jpg',
                id: 8
            },
            {
                name: 'Bjarne Stroustrup',
                followers: 512,
                imgPath: 'src/assets/profile.jpg',
                id: 9                
            },
        ]
    }

    render(){
        return(
            <div className={classes.Following}>
                <h2 className={classes.Following__Heading}>Followers: 9</h2>
                <div className={classes.Following__Container}>
                    {this.state.people.map(person => (
                        <Person data={person} key={person.id} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Following;