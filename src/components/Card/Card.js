import React from 'react'

import classes from './Card.scss'

import Summary from '../Summary/Summary';
import Popup from '../../UI/Popup/Popup'

class Card extends React.Component {
    
    render() {
        const date = this.props.data.date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        return (
            <div className={classes.Card}>
                <div className={classes.Card__AuthorBox}>
                    <div className={classes.Card__Avatar}
                        style={{ backgroundImage: `url(${this.props.data.author.imgPath})` }}>
                        {/* slika */}
                    </div>
                    <div className={classes.Card__Data}>
                        <h5 className={classes.Card__Data__Name}>{this.props.data.author.name}</h5>
                        <p className={classes.Card__Data__Date}>{date}</p>
                    </div>
                    <Popup />
                </div>
                <p className={classes.Card__Description} >
                    {this.props.data.description}
                </p>
                <div className={classes.Card__Image}
                    style={{ backgroundImage: `url(${this.props.data.imgPath})` }}>
                    {/* slika */}
                </div>
                <h2 onClick={() => this.props.singlePost(this.props.data.heading)} className={classes.Card__Heading}>{this.props.data.heading} &rarr;</h2>
                <div style={{ padding: '0 2rem' }}>
                    <Summary time={this.props.data.time}
                        difficulty={this.props.data.difficulty}
                        hearts={this.props.data.hearts} />
                </div>
            </div>
        )
    }
}

export default Card;