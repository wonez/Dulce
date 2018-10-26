import React, { Component } from 'react'

import { connect } from 'react-redux'

import Page from '../../hoc/Page/Page'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem';
import FormButton from '../../UI/FormButton/FormButton'

import classes from './EditProfile.scss'
import ImagePicker from '../../UI/ImagePicker/ImagePicker';

class EditProfile extends Component {

    state = {
        profile: {}
    }

    pickHandler = (img, data) => {
        this.setState({
            profile:{
                ...this.state.profile,
                [img]: data
            }
        })
    } 

    componentDidUpdate(){
        this.setState({
            profile: {
                ...this.props.profile
            }
        })
    }

    shouldComponentUpdate(){
        return !this.state.profile.email
    }

    render(){
        let content = null

        if(this.props.profile){
            content = (
                <Page width="900">
                    <h2 className={classes.Heading}>Edit Profile</h2>
                    <div className={classes.Cover}
                        style={{backgroundImage: `url('${this.state.profile.coverUrl}')`}}
                    >
                        <ImagePicker 
                                id="cover"
                                label="Change photo"
                                type="cover"
                                fileHandler={(data) => { this.pickHandler('cover', data) }}
                            />
                        {/* choose photo */}
                        <div className={classes.Avatar}
                            style={{backgroundImage: `url('${this.state.profile.avatarUrl}')`}}
                            >
                            <ImagePicker 
                                id="avatar"
                                label="Choose image"
                                type="avatar"
                                fileHandler={(data) => { this.pickHandler('avatar', data) }}
                            />
                            {/* choose photo */}
                        </div>                    
                    </div>
                    <div className={classes.Data}>
                        <div className={classes.Data__Name}>
                            <RoundedFormItem
                                label="New Password" 
                                type="password"
                                placeholder='New Password'
                                />
                            <RoundedFormItem 
                                label="Confirm New Password" 
                                type="password"
                                placeholder='Confirm New Password'
                                />
                        </div>
                        <div className={classes.Data__From}>
                            <RoundedFormItem
                                label="Country" 
                                type="input"
                                placeholder='Country Name'
                                />
                            <RoundedFormItem 
                                label="City" 
                                type="input"
                                placeholder='City Name'
                                />
                        </div>
                        <RoundedFormItem 
                            label="Biography"
                            type="textarea"
                            placeholder='Tell other people about yourself, your hobbies and interests...'
                            />
                        <div className={classes.Data__Buttons}>
                                <FormButton
                                    type="primary"
                                    >Update</FormButton>
                                <FormButton
                                    type="danger"
                                    >Cancel</FormButton>
                        </div>
                    </div>
                </Page>
            )
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
