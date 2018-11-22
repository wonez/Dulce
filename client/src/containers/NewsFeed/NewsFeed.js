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
        console.log(id);
        this.props.history.push(`post/${id}`)
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.NewsFeed} >
                    {this.state.items.map( item => {
                        return <Card    key={item._id}
                                        data={item} 
                                        singlePost={this.handleSinglePost} />
                    })}
                </div>
            </Aux>
        );
    }
}

export default withRouter(NewsFeed);