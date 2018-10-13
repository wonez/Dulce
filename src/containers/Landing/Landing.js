import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import Entry from './Entry/Entry';
import LearnMore from './LearnMore/LearnMore'
import Aux from '../../hoc/Aux';

class Landing extends Component {
    
    handleCategories = () => {
        this.props.history.push('/allcategories')
    }

    render(){
        return(
            <Aux>
                <Entry handleCategories={this.handleCategories}/>
                <LearnMore />
            </Aux>
        )
    }
};

export default withRouter(Landing);