import React, { Component } from 'react'

import classes from './Following.scss';


import Person from '../../components/Person/Person'
import NothingToShow from '../../components/NothingToShow/NothingToShow'

class Following extends Component{

    state = {
        people: []
    }

    render(){

        let content = (
            <NothingToShow 
                message='User is not following anyone'
                icon='user'/>
        )

        if(this.state.people.length > 0){
            content = (
                <div className={classes.Following}>
                    <h2 className={classes.Following__Heading}>Followers: {this.state.people.length}</h2>
                    <div className={classes.Following__Container}>
                        {this.state.people.map(person => (
                            <Person data={person} key={person.id} />
                            ))}
                    </div>
                </div>
            )
        }

        return content;
    }
}

export default Following;