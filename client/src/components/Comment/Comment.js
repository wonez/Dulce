import React, { Component } from 'react'

import { connect } from 'react-redux'
import classes from './Comment.scss'

import BtnPrimary from '../../UI/BtnPrimary/BtnPrimary'
import Popup from '../../UI/Popup/Popup'

class Comment extends Component {

    state = {
        edit: false,
        value: ''
    }

    editComment = () => {
        this.setState({
            edit: true,
            value: this.props.comment.text
        })
    }

    editSubmit = () => {
        this.props.editComment(this.props.comment._id, this.state.value)
        this.setState({
            edit: false
        })
    }

    cancelEdit = () => {
        this.setState({
            edit: false,
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render(){
    
        let content = null;
        const date = new Date(this.props.comment.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });    
        
        if(this.state.edit){
            content = (
                <div className={classes.Comment}> 
                    <div className={classes.AvatarBox}>
                        <div    className={classes.Avatar}
                                style={{backgroundImage: `url(${this.props.comment.author.avatarUrl})`}} >
                            {/* slika */}
                        </div>
                    </div>
                    <div className={classes.InfoBox}>
                        <div className={classes.InfoBox__Info}>
                            <a  className={classes.InfoBox__Info__Name} 
                                onClick={()=> this.props.handleUser(this.props.comment.author.uri)}>{`${this.props.comment.author.name} ${this.props.comment.author.surname}`}</a>
                        </div>
                        <textarea className={classes.InputArea} onChange={this.handleChange} value={this.state.value}>
                        </textarea>
                        <div className={classes.BtnBox}>
                            <BtnPrimary 
                                disabled={this.state.value.trim().length == 0 || this.state.value.trim() == this.props.comment.text.trim()}
                                click={this.editSubmit}
                                size="small">Submit</BtnPrimary>
                            <BtnPrimary 
                                click={this.cancelEdit}
                                danger
                                size="small">Cancel</BtnPrimary>
                        </div>
                    </div>
                </div>
            )
        }else{
            content = (
                <div className={classes.Comment}> 
                    <div className={classes.AvatarBox}>
                        <div    className={classes.Avatar}
                                style={{backgroundImage: `url(${this.props.comment.author.avatarUrl})`}} >
                            {/* slika */}
                        </div>
                    </div>
                    <div className={classes.InfoBox}>
                        <div className={classes.InfoBox__Info}>
                            <a  className={classes.InfoBox__Info__Name} 
                                onClick={()=> this.props.handleUser(this.props.comment.author.uri)}>{`${this.props.comment.author.name} ${this.props.comment.author.surname}`}</a>
                            <div className={classes.InfoBox__Info__Misc}>
                                <p className={classes.InfoBox__Info__Date}>{date}</p>
                                {this.props.user && this.props.user._id === this.props.comment.author._id ? 
                                    <Popup
                                        selectForDeletion={this.props.selectComment}
                                        editComment={this.editComment}
                                        comment
                                        data={this.props.comment}
                                    /> : null}
                            </div>
                        </div>
                        <p className={classes.InfoBox__Content}>
                            {this.props.comment.text}
                        </p>
                    </div>
                </div>
            )
        }

        return content
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(Comment);