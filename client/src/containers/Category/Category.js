import React, { Component } from 'react'
import axios from '../../utility/axios'

import classes from './Category.scss'

import Aux from '../../hoc/Aux'
import CardSmall from '../../components/CardSmall/CardSmall'
import Toolbar from '../../components/Toolbar/Toolbar';

class Category extends Component {

    state = {
        items : [],
        name: ''
    }

    componentDidMount(){
        const id  = this.props.match.params.id;
        axios.get(`/category/${id}`)
            .then(res => {
                // this.setState()
                // console.log(res);
            })
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Category}>
                    <div className={classes.Category__Container}>
                        <h1 className={classes.Category__Heading}>{this.state.name}</h1>
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