import React, { Component } from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar';

import classes from './AllCategories.scss'

class AllCategories extends Component{

    state = {
        categories : []
    }

    componentDidMount(){
        axios.get('/category')
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        categories: res.data
                    })
                }
            })
    }

    categoryHandler = (uri) => {
        this.props.history.push(`/category/${uri}`)
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.AllCategories}>
                    <div className={classes.Container}>
                        <h1 className={classes.Heading}>Categories</h1>
                        {this.state.categories.map(category => {
                            return <a   onClick={() => this.categoryHandler(category.uri)}
                                        className={classes.Category} 
                                        key={category._id}>{category.name}</a>
                        })}
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withRouter(AllCategories);