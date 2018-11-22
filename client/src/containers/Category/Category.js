import React, { Component } from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom'
import classes from './Category.scss'

import Aux from '../../hoc/Aux'
import CardSmall from '../../components/CardSmall/CardSmall'
import Toolbar from '../../components/Toolbar/Toolbar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';

class Category extends Component {

    state = {
        items : [],
        name: ''
    }

    componentDidMount(){
        const id  = this.props.match.params.id;
        axios.get(`/category/${id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        items: res.data.posts,
                        name: res.data.category.name
                    })
                }
            })
    }

    clickHandler = (id) => {
        this.props.history.push(`/post/${id}`);
    }

    render(){

        let content = (
            <NothingToShow 
                message='No Posts in this category'
                icon='post'
            />
        )

        if(this.state.items.length){
            content = (
                <div className={classes.Category__Items}>
                    {this.state.items.map(item => {
                        return <CardSmall   card={item} 
                                            click={() => this.clickHandler(item._id)}
                                            key={item._id} />
                    })}
                </div>
            )
        }

        return(
            <Aux>
                <Toolbar />
                <div className={classes.Category}>
                    <div className={classes.Category__Container}>
                        <h1 className={classes.Category__Heading}>{this.state.name}</h1>
                        {content}
                        {/* load more */}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withRouter(Category);