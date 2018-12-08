import React, { Component } from 'react'
import { withRouter } from 'react-router' 
import { connect } from 'react-redux'
import axios from '../../utility/axios'

import Card from '../../components/Card/Card';
import Confirm from '../../UI/Confirm/Confirm';
import Loading from '../../UI/Loading/Loading';
import NothingToShow from '../../components/NothingToShow/NothingToShow';

import { startLoading, endLoading } from '../../store'

import classes from './Timeline.scss'

class Timeline extends Component {

    state = {
        items: [],
        count: 0,
        requested: false
    }

    componentDidMount(){
        this.onRouteChanged();
        window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadMore)
    }

    componentDidUpdate(prevProps){
        if(this.props.userId !== prevProps.userId){
            this.onRouteChanged();
        }
    }

    loadMore = () => {
        const elem = document.scrollingElement;
        if(elem.scrollHeight - (elem.scrollTop + elem.clientHeight) < 200 && 
            this.state.items.length < this.state.count &&
            !this.state.requested ){
                //last 200px
                this.setState({
                    requested: true
                })
                this.onRouteChanged()
            }
    }

    onRouteChanged(){
        this.props.startLoading();
        axios.get(`/post/user/${this.props.userId}?start=${this.state.items.length}`)
            .then(res => {
                this.props.endLoading();
                if(res.status == 200){
                    this.setState(prevState => ({
                        items: prevState.items.concat(res.data.posts),
                        count: res.data.count,
                        requested: false
                    }))
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
            <div className={classes.Timeline}>
                {this.state.items.map((item, i) => (
                    <Card
                        selectForDeletion={() => {this.selectForDeletion(item._id, i)}}
                        handleLike={() => { this.handleLike(item._id, i) }}
                        data={item} 
                        key={item._id}/>
                ))}
                {this.state.items.length < 1 ? <NothingToShow 
                                                    icon='post'
                                                    message='User has no posts'/> : null}
                <Confirm 
                    confirmHandler={this.deleteHandler}
                    />
                <Loading />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: () => dispatch(startLoading()),        
        endLoading: () => dispatch(endLoading()),        
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Timeline));