import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import Entry from './Entry/Entry';
import Aux from '../../hoc/Aux';

class Landing extends Component {
    
    handleCategories = () => {
        this.props.history.push('/allcategories')
    }

    render(){
        return(
            <Aux>
                <Entry handleCategories={this.handleCategories}/>
            </Aux>
        )
    }
};

export default withRouter(Landing);