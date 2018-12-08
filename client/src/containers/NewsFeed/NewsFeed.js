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
        count: 0,
        requested: false
    }

    componentDidMount(){
        this.getPosts();
        window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadMore)
    }

    getPosts = () => {
        this.props.startLoading();
        axios.get(`/post?start=${this.state.items.length}`)
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
        if(!this.props.user)
            return;
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

    loadMore = () => {
        const elem = document.scrollingElement;
        if(elem.scrollHeight - (elem.scrollTop + elem.clientHeight) < 200 && 
            this.state.items.length < this.state.count &&
            !this.state.requested ){
                //last 200px
                this.setState({
                    requested: true
                })
                this.getPosts();
            }
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
                    {this.state.items.length < 1 ? <NothingToShow 
                                                        icon='post'
                                                        message= 'Nothing to show' /> : null}
                </div>
                <Confirm 
                    confirmHandler={this.deleteHandler}
                    />
                <Loading />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: () => dispatch(startLoading()),        
        endLoading: () => dispatch(endLoading()),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsFeed));