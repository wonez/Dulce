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

        if(this.props.isLogged){
            const to = this.props.location.state ? this.props.location.state.from.pathname : '/profile';
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
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps, null)(withRouter(Landing));