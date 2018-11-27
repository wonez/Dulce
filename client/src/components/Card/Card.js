import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import classes from './Card.scss'

import Summary from '../Summary/Summary';
import Popup from '../../UI/Popup/Popup'

class Card extends React.Component {

    handleUser = () => {
        this.props.history.push(`/profile/${this.props.data.author._id}`)
    }

    singlePost = (id) => {
        this.props.history.replace(`/post/${id}`)
    }

    render() {
        const date = new Date(this.props.data.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return (
            <div className={classes.Card}>
                <div className={classes.Card__AuthorBox}>
                    <div className={classes.Card__Avatar}
                        style={{ backgroundImage: `url(${this.props.data.author.avatarUrl})` }}>
                        {/* slika */}
                    </div>
                    <div className={classes.Card__Data}>
                        <h5 onClick={this.handleUser} className={classes.Card__Data__Name}>{`${this.props.data.author.name} ${this.props.data.author.surname}`}</h5>
                        <p className={classes.Card__Data__Date}>{date}</p>
                    </div>
                    {this.props.data._id == this.props.user._id ?
                         <Popup post={this.props.data}/>
                    : null}
                </div>
                <p className={classes.Card__Description} >
                    {this.props.data.description}
                </p>
                <div className={classes.Card__Image}
                    style={{ backgroundImage: `url(${this.props.data.imgUrl})` }}>
                    {/* slika */}
                </div>
                <h2 onClick={() => this.singlePost(this.props.data._id)} className={classes.Card__Heading}>{this.props.data.title} &rarr;</h2>
                <div style={{ padding: '0 2rem' }}>
                    <Summary    
                        handleLike={this.props.handleLike}
                        time={this.props.data.prepTime}
                        difficulty={this.props.data.level}
                        hearts={this.props.data.likes} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(Card));