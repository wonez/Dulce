import React, { Component } from 'react'
import axios from '../../utility/axios'
import classes from './Category.scss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux'
import CardSmall from '../../components/CardSmall/CardSmall'
import Toolbar from '../../components/Toolbar/Toolbar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import LoadMore from '../../UI/LoadMore/LoadMore'
import Loading from '../../UI/Loading/Loading'

import { startLoading, endLoading } from '../../store'

class Category extends Component {

    state = {
        items : [],
        name: '',
        count: 0,
    }

    clickHandler = (uri) => {
        this.props.history.push(`/post/${uri}`);
    }

    loadItems = () => {
        this.props.load();
        const uri  = this.props.match.params.uri;
        axios.get(`/category/${uri}?start=${this.state.items.length}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        return{
                            items: prevState.items.concat(res.data.posts),
                            name: res.data.category.name,
                            count: res.data.postsCount,
                        }
                    })
                    this.props.loaded();
                }
            })
    }

    componentDidMount(){
        this.loadItems();
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
                                            click={() => this.clickHandler(item.uri)}
                                            key={item._id} />
                    })}
                </div>
            )
        }

        let loadMore = <LoadMore click={this.loadItems }/>

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
                <Loading />
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        load: () => dispatch(startLoading()),
        loaded: () => dispatch(endLoading())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Category));