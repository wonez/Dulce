import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

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

    categoryHandler = () => {
        this.props.history.push('/singleCategory')
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.AllCategories}>
                    <div className={classes.Container}>
                        <h1 className={classes.Heading}>Categories</h1>
                        {this.state.categories.map(category => {
                            return <a   onClick={this.categoryHandler}
                                        className={classes.Category} 
                                        key={category}>{category}</a>
                        })}
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withRouter(AllCategories);