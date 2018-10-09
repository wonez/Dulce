import React, { Component } from 'react'

import classes from './About.scss'

class About extends Component {

    state = {
        profile: {
            aboutMe: 'Hi, I’m John, I’m 36 and I work as a Digital Designer, I like sports, sweets and videogames as well.',
            joined: new Date('Oct 2, 2017'),
            gender: 'M',
            from: 'Wien, Austria',
            imgPath: 'src/assets/profile.jpg',
            followers: 623
        }
    }

    render() {

        const joined = this.state.profile.joined.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        return (
            <div className={classes.About}>
                <div className={classes.About__Image}
                    style={{backgroundImage: `url(${this.state.profile.imgPath})`}}>
                    {/* slika */}
                </div>
                <div className={classes.About__Container}>
                    <p className={classes.About__AboutMe}>
                        {this.state.profile.aboutMe}
                    </p>
                    <hr />
                    <div className={classes.About__Item}>
                        <h4>Joined</h4>
                        <p>{joined}</p>
                    </div>
                    <div className={classes.About__Item}>
                        <h4>Followers</h4>
                        <p>{this.state.profile.followers}</p>
                    </div>
                    <div className={classes.About__Item}>
                        <h4>Gender</h4>
                        <p>{this.state.profile.gender === 'M' ? 'Male' : 'Female'}</p>
                    </div>
                    <div className={classes.About__Item}>
                        <h4>From</h4>
                        <p>{this.state.profile.from}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;