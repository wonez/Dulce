import React, { Component } from 'react'

import classes from './Category.scss'

import Aux from '../../hoc/Aux'
import CardSmall from '../../components/CardSmall/CardSmall'
import Toolbar from '../../components/Toolbar/Toolbar';

class Category extends Component {

    state = {
        items : [
            {
                img: 'src/assets/mp-img-1.jpg',
                heading: 'Raspberry Pancakes',
                time: 25,
                difficulty: 'Beginner',
                hearts: 131
            },
            {
                img: 'src/assets/mp-img-2.jpg',
                heading: 'Tiramisu',
                time: 45,
                difficulty: 'Hard',
                hearts: 176
            },
            {
                img: 'src/assets/mp-img-3.jpg',
                heading: 'Strawberry Cupcakes',
                difficulty: 'Intermediate',
                time: 30,
                hearts: 97
            },
            {
                img: 'src/assets/mp-img-2.jpg',
                heading: 'Tiramisu',
                time: 35,
                difficulty: 'Hard',
                hearts: 176
            },
            {
                img: 'src/assets/mp-img-3.jpg',
                heading: 'Strawberry Cupcakes',
                difficulty: 'Intermediate',
                time: 10,
                hearts: 97
            },
            {
                img: 'src/assets/mp-img-1.jpg',
                heading: 'Raspberry Pancakes',
                time: 22,
                difficulty: 'Beginner',
                hearts: 131
            },
        ]
    }


    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Category}>
                    <div className={classes.Category__Container}>
                        <h1 className={classes.Category__Heading}>Chocolate</h1>
                        <div className={classes.Category__Items}>
                            {this.state.items.map(item => {
                                return <CardSmall card={item} key={item.time} />
                            })}
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Category;