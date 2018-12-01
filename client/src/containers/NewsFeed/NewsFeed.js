import React from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Toolbar from '../../components/Toolbar/Toolbar';
import Card from '../../components/Card/Card';
import Confirm from '../../UI/Confirm/Confirm';
import Loading from '../../UI/Loading/Loading';
import Aux from '../../hoc/Aux'
import NothingToShow from '../../components/NothingToShow/NothingToShow';

import classes from './NewsFeed.scss'

import { startLoading, endLoading } from '../../store/index'

class NewsFeed extends React.Component {

    state = {
        items: [],
    }

    componentDidMount(){
        axios.get('/post')
            .then(res => {
                if(res.status == 200){
                    this.setState({
                        items: res.data
                    })
                }
            })
    }

    handleLike = (id, i) => {
        axios.post(`/post/like/${id}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        const newState = {
                            ...prevState,
                            items:[
                                ...prevState.items,
                            ]
                        }
                        newState.items[i] = {
                            ...prevState.items[i],
                            likes: [...res.data.likes]
                        }
                        return newState;
                    })
                }
            })
    }

    deleteHandler = () => {
        this.props.startLoading();
        axios.delete(`/post/${this.state.selected}`)
            .then(res => {
                this.props.endLoading();
                this.setState(prevState => {
                    const items = [...prevState.items];
                    items.splice(prevState.position, 1)
                    return {
                        ...prevState,
                        items
                    }
                })
            })
    }    

    selectForDeletion = (id, i) => {
        this.setState({
            selected: id,
            position: i
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.NewsFeed} >
                    {this.state.items.map( (item, i) => {
                        return <Card
                                    selectForDeletion={() => {this.selectForDeletion(item._id, i)}}
                                    handleLike={() => this.handleLike(item._id, i)}    
                                    key={item._id}
                                    data={item} />
                    })}
                </div>
                <Confirm 
                    confirmHandler={this.deleteHandler}
                    />
                <Loading />
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: () => dispatch(startLoading()),        
        endLoading: () => dispatch(endLoading()),        
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NewsFeed));