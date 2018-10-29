import React from 'react'

import {connect} from 'react-redux'

import classes from './Loading.scss'

const Loading = (props) => {

    const render = props.loading ? (
        <div className={[classes.Modal, classes.show].join(' ')}>
            <div className={classes.Spinner}>
            </div>
        </div>
    ) : null

    return render;
}

export default connect(state => ({
    loading: state.ui.loading
}))(Loading);