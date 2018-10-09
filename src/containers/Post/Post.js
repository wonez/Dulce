import React, { Component } from 'react'

class Post extends Component{

    componentDidMount(){
        this.setState({
            item: this.props.location.state.item
        })
    }

    render(){
        return(
            <h1>{this.state && this.state.item != null ? this.state.item.heading : null}</h1>
        )
    }
}

export default Post;