import React, { Component } from 'react';

import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import Entry from '../../components/Entry/Entry';
import Aux from '../../hoc/Aux';

class Landing extends Component {
    
    handleCategories = () => {
        this.props.history.push('/allcategories')
    }

    render(){

        let redirect = null;

        if(this.props.user){
            const to = this.props.location.state ? this.props.location.state.from.pathname : `/profile/${this.props.user._id}`;
            redirect = <Redirect to={to}/> 
        }
        
        return(
            <Aux>
                {redirect}
                <Entry handleCategories={this.handleCategories}/>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(withRouter(Landing));