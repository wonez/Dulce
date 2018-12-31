import React, { Component } from 'react'
import axios from '../../utility/axios'
import { withRouter } from 'react-router-dom'
import classes from './Following.scss';

import Person from '../../components/Person/Person'
import NothingToShow from '../../components/NothingToShow/NothingToShow'
import LoadMore from '../../UI/LoadMore/LoadMore'

class Following extends Component{

    state = {
        people: [],
    }

    componentDidMount(){
        this.onRouteChanged();
    }

    componentDidUpdate(prevProps){
        if(this.props.userId !== prevProps.userId ){
            this.onRouteChanged();
        }
    }

    onRouteChanged = () => {
        this.setState({
            people: []
        }, ()=> {
            this.getUsers();
        })
    }

    getUsers = () => {
        axios.get(`/following/${this.props.userId}?start=${this.state.people.length}`)
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            people: prevState.people.concat(res.data.people)
                        }
                    })
                }
            })
    }

    goToUser = (uri) => {
        this.props.history.push(`/profile/${uri}`)
    }

    render(){

        let content = (
            <NothingToShow 
                message='User is not following anyone'
                icon='user'/>
        )

        if(this.props.count > 0){
            content = (
                <div className={classes.Following}>
                    <h2 className={classes.Following__Heading}>Followers: {this.props.count}</h2>
                    <div className={classes.Following__Container}>
                        {this.state.people.map(person => (
                            <Person click={() => this.goToUser(person.uri)} data={person} key={person._id} />
                            ))}
                    </div>
                    {this.state.people.length < this.props.count ? 
                        <LoadMore click={this.getUsers} /> : null}
                </div>
            )
        }

        return content;
    }
}

export default withRouter(Following);