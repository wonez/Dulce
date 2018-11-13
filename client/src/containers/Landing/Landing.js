import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Entry from '../../components/Entry/Entry';
import NewsFeed from '../../containers/NewsFeed/NewsFeed'
import Aux from '../../hoc/Aux';

const Landing = props => (
    <Aux>
        {props.user ? <NewsFeed /> : <Entry />}
    </Aux>
)

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(withRouter(Landing));