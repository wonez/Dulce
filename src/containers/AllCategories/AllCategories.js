import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar';

import classes from './AllCategories.scss'

class AllCategories extends Component{

    state = {
        categories : [
            'Less than 15 minutes',
            'Chocolate',
            'Birthday',
            'Fruit Made',
            'No Baking needed',
            'Grandmas Recipe',
            'Wedding',
        ]
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.AllCategories}>
                    <div className={classes.Container}>
                        <h1 className={classes.Heading}>Categories</h1>
                        {this.state.categories.map(category => {
                            return <a className={classes.Category} key={category}>{category}</a>
                        })}
                    </div>
                </div>
            </Aux>
        );
    }
}

export default AllCategories;