import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar';

import CardSmall from '../../components/CardSmall/CardSmall'
import Person from '../../components/Person/Person'

import classes from './Search.scss'

class Search extends React.Component{

    // componentDidMount(){
    //     // handle request
    // }
    state = {
        recipes : [
            {
                img: 'src/assets/mp-img-1.jpg',
                heading: 'Raspberry Pancakes',
                time: 25,
                difficulty: 'Beginner',
                hearts: 131
            },
            {
                img: 'src/assets/mp-img-3.jpg',
                heading: 'Strawberry Pancakes',
                time: 21,
                difficulty: 'Beginner',
                hearts: 231
            },
            {
                img: 'src/assets/mp-img-1.jpg',
                heading: 'Raspberry Pancakes',
                time: 252,
                difficulty: 'Beginner',
                hearts: 1311
            },
        ],
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
                id: 4,
            },
            {
                name: 'JJ Thompson',
                followers: 2314,
                imgPath: 'src/assets/profile.jpg',
                id: 5,
            },
            {
                name: 'Bjarne Stroustrup',
                followers: 512,
                imgPath: 'src/assets/profile.jpg',
                id: 6
            },
        ]
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Info}>
                    <h1>Search results for: <span>pancakes</span></h1>
                </div>
                <div className={classes.Search}>
                    <div className={classes.Search__Container}>
                        <h2 className={classes.Search__Heading}>Recipes</h2>
                        <small>Results: 18</small>
                        <div className={classes.Search__Items}>
                            {this.state.recipes.map(item => {
                                return <CardSmall card={item} key={item.time} />
                            })}
                        </div>
                        <a className={classes.Search__LoadMore}>Load More</a>
                    </div>
                    <div className={classes.Search__Container}>
                        <h2 className={classes.Search__Heading}>People</h2>
                        <small>Results: 12</small>                        
                        <div className={classes.Search__Items}>
                            {this.state.people.map(person => {
                                return <Person data={person} key={person.id} />
                            })}
                        </div>
                        <a className={classes.Search__LoadMore}>Load More</a>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Search;