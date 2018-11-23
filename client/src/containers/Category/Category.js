import React, { Component } from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom'
import classes from './Category.scss'

import Aux from '../../hoc/Aux'
import CardSmall from '../../components/CardSmall/CardSmall'
import Toolbar from '../../components/Toolbar/Toolbar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import LoadMore from '../../UI/LoadMore/LoadMore'

class Category extends Component {

    state = {
        items : [],
        name: '',
        count: 0,
        loading: false
    }

    componentDidMount(){
        const id  = this.props.match.params.id;
        axios.get(`/category/${id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        items: res.data.posts,
                        name: res.data.category.name,
                        count: res.data.postsCount
                    })
                }
            })
    }

    clickHandler = (id) => {
        this.props.history.push(`/post/${id}`);
    }

    loadItems = () => {
        const id  = this.props.match.params.id;
        this.setState({
            loading: true
        })
        axios.get(`/category/${id}?start=${this.state.items.length}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        return{
                            items: prevState.items.concat(res.data.posts),
                            name: res.data.category.name,
                            count: res.data.postsCount,
                            loading: false
                        }
                    })
                } 
            })
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

        let loadMore = null;

        if(this.state.loading){
            loadMore = <h2>Loading...</h2>
        }else{
            loadMore = <LoadMore click={this.loadItems }/>
        }

        return(
            <Aux>
                <Toolbar />
                <div className={classes.Category}>
                    <div className={classes.Category__Container}>
                        <h1 className={classes.Category__Heading}>{this.state.name}</h1>
                        {content}
                        {this.state.items.length ? <p className={classes.Category__Count}>{`Showing ${this.state.items.length}/${this.state.count} items`}</p> : null }
                        {this.state.items.length < this.state.count ? loadMore : null}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withRouter(Category);