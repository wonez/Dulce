import React, { Component } from 'react'

import { connect } from 'react-redux'

import classes from './About.scss'

class About extends Component {

    state = {
        profile: null
    }

    componentDidMount() {
        this.setState({
            profile: this.props.user
        })
    }

    render() {

        let content = null;

        if (this.state.profile) {

            const joined = new Date(this.state.profile.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

            content = (
                <div className={classes.About}>
                    <div className={classes.About__Image}
                        style={{ backgroundImage: `url(${this.state.profile.avatarUrl})` }}>
                        {/* slika */}
                    </div>
                    <div className={classes.About__Container}>
                        <p className={classes.About__AboutMe}>
                            {this.state.profile.biography ? this.state.profile.biography : "No Biography added yet"}
                        </p>
                        <hr />
                        <div className={classes.About__Item}>
                            <h4>Joined</h4>
                            <p>{joined}</p>
                        </div>
                        <div className={classes.About__Item}>
                            <h4>Followers</h4>
                            <p>{this.state.profile.following.length}</p>
                        </div>
                        <div className={classes.About__Item}>
                            <h4>From</h4>
                            <p>
                                {this.state.profile.city && this.state.profile.country ? `${this.state.profile.city}, ${this.state.profile.country}` : "No Place added yet"}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        return content;
    }
}

export default About;