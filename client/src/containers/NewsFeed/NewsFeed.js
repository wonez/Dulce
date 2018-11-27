import React from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom'

import Toolbar from '../../components/Toolbar/Toolbar';
import Card from '../../components/Card/Card';
import Aux from '../../hoc/Aux'

import classes from './NewsFeed.scss'

class NewsFeed extends React.Component {

    state = {
        items: []
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

    handleSinglePost = (id) => {
        this.props.history.push(`post/${id}`)
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

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.NewsFeed} >
                    {this.state.items.map( (item, i) => {
                        return <Card
                                    handleLike={() => this.handleLike(item._id, i)}    
                                    key={item._id}
                                    data={item} 
                                    singlePost={this.handleSinglePost} />
                    })}
                </div>
            </Aux>
        );
    }
}

export default withRouter(NewsFeed);