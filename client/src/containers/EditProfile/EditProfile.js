import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Page from '../../hoc/Page/Page'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem';
import FormButton from '../../UI/FormButton/FormButton'
import ImagePicker from '../../UI/ImagePicker/ImagePicker';
import Loading from '../../UI/Loading/Loading'

import classes from './EditProfile.scss'

import { validateField } from '../../utility/validate'
import Confirm from '../../UI/Confirm/Confirm';

import { showConfirmDialog, tryEditProfile,  } from '../../store/index'

class EditProfile extends Component {

    state = {
        profile: {},
        form: {
            fields: {
                password: { value: ''},
                passwordConfirm: { value: '' },
                country: { value: '' },
                city: { value: '' },
                biography: { value: '' },
                avatarUrlFile: null,
                coverUrlFile: null
            }
        }
    }
    
    pickHandler = (img, data, file) => {
        this.setState({
            profile:{
                ...this.state.profile,
                [img]: data
            },
            form: {
                ...this.state.form,
                fields: {
                    ...this.state.form.fields,
                    [`${img}File`]: file
                },
                valid: true
            }
        })
    } 

    componentDidMount(){
        if (!this.state.profile.email){
            this.setState(_ => {
                return {
                    profile: {
                        ...this.props.profile
                    },
                    form: {
                        fields: {
                            password: {
                                value: '',
                                valid: true,
                                touched: false,
                                rules: {
                                    minLength: 4,
                                }
                            },
                            passwordConfirm: {
                                value: '',
                                valid: true,
                                touched: false,
                                rules: {
                                    minLength: 4,
                                }
                            },
                            country: {
                                value: this.props.profile.country,
                                touched: false,
                            },
                            city: {
                                value: this.props.profile.city,
                                touched: false,
                            },
                            biography: {
                                value: this.props.profile.biography,
                                touched: false,
                            }
                        },
                        valid: false
                    }
                }
            })
        }
    }

    handlePasswordValidation = (newState, field, val) => {
        let otherField = 'password';
        if(field == 'password'){
            otherField = 'passwordConfirm'
        }
        newState.form.fields[field].value = val
        const valid = validateField(newState.form.fields[field].rules, val) && newState.form.fields[field].value === newState.form.fields[otherField].value
        newState.form.fields[field].valid = valid;
        newState.form.fields[otherField].valid = valid;
        newState.form.fields[otherField].touched = true;

        if(!newState.form.fields[field].value.length && !newState.form.fields[otherField].value.length){
            newState.form.fields[field].valid = true;
            newState.form.fields[field].touched = false;
            newState.form.fields[otherField].valid = true;
            newState.form.fields[otherField].touched = false;
        }
    }

    submitHandler = () => {
        this.props.tryEditProfile({
            _id: this.state.profile._id,
            coverUrlFile: this.state.form.fields.coverUrlFile,
            avatarUrlFile: this.state.form.fields.avatarUrlFile,
            password: this.state.form.fields.password.value,
            country: this.state.form.fields.country.value,
            city: this.state.form.fields.city.value,
            biography: this.state.form.fields.biography.value,
        }).then(() => {
            this.props.history.replace('/')
        })
    }

    textChanged = (field, val) => {
        this.setState(oldState => {
            const newState = {
                ...oldState,
                form : {
                    ...oldState.form,
                    fields: {
                        ...oldState.form.fields,
                        [field]: {
                            ...oldState.form.fields[field],
                            touched: val.length != 0,                            
                            value: val,
                        }
                    }
                }
            }
            if(field == 'password' || field == 'passwordConfirm'){
                this.handlePasswordValidation(newState, field, val)
            }
            newState.form.valid = 
                (   newState.form.fields.country.touched ||
                    newState.form.fields.city.touched ||
                    newState.form.fields.biography.touched ) &&
                ( newState.form.fields.password.valid && newState.form.fields.passwordConfirm.valid) ||
                ( newState.form.fields.password.valid && newState.form.fields.password.touched && newState.form.fields.passwordConfirm.valid && newState.form.fields.passwordConfirm.touched)
            return newState;
        })
    }


    render(){
        let content = null

        if(this.state.profile){
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
                                fileHandler={(data, file) => { this.pickHandler('coverUrl', data, file) }}
                            />
                        {/* choose photo */}
                        <div className={classes.Avatar}
                            style={{backgroundImage: `url('${this.state.profile.avatarUrl}')`}}
                            >
                            <ImagePicker 
                                id="avatar"
                                label="Choose image"
                                type="avatar"
                                fileHandler={(data, file) => { this.pickHandler('avatarUrl', data, file) }}
                            />
                            {/* choose photo */}
                        </div>                    
                    </div>
                    <div className={classes.Data}>
                        <div className={classes.Data__Password}>
                            <RoundedFormItem
                                label="New Password" 
                                type="password"
                                placeholder='New Password'
                                value={this.state.form.fields.password.value}
                                onChange={(e) => this.textChanged('password', e.target.value)}
                                validity={this.state.form.fields.password.valid ? 'valid' : 'invalid'}
                                touched={this.state.form.fields.password.touched}
                                />
                            <RoundedFormItem 
                                label="Confirm New Password" 
                                type="password"
                                placeholder='Confirm New Password'
                                value={this.state.form.fields.passwordConfirm.value}
                                onChange={(e) => this.textChanged('passwordConfirm', e.target.value)}
                                validity={this.state.form.fields.passwordConfirm.valid ? 'valid' : 'invalid'}
                                touched={this.state.form.fields.passwordConfirm.touched}
                                />
                        </div>
                        <div className={classes.Data__From}>
                            <RoundedFormItem
                                label="Country" 
                                type="input"
                                placeholder='Country Name'
                                value={this.state.form.fields.country.value}
                                onChange={(e) => this.textChanged('country', e.target.value)}
                                validity={this.state.form.fields.country.touched ? 'valid' : 'invalid'}
                                touched={this.state.form.fields.country.touched}
                                />
                            <RoundedFormItem 
                                label="City" 
                                type="input"
                                placeholder='City Name'
                                value={this.state.form.fields.city.value}
                                onChange={(e) => this.textChanged('city', e.target.value)}
                                validity={this.state.form.fields.city.touched ? 'valid' : 'invalid'}
                                touched={this.state.form.fields.city.touched}
                                />
                        </div>
                        <RoundedFormItem 
                            label="Biography"
                            type="textarea"
                            placeholder='Tell other people about yourself, your hobbies and interests...'
                            value={this.state.form.fields.biography.value}
                            onChange={(e) => this.textChanged('biography', e.target.value)}
                            validity={this.state.form.fields.biography.touched ? 'valid' : 'invalid'}
                            touched={this.state.form.fields.biography.touched}
                            />
                        <div className={classes.Data__Buttons}>
                                <FormButton
                                    click={this.submitHandler}
                                    disabled={!this.state.form.valid}
                                    type="primary"
                                    >Update</FormButton>
                                <FormButton
                                    click={this.props.showConfirmDialog}
                                    type="danger"
                                    >Cancel</FormButton>
                        </div>
                        <Confirm confirmHandler={ () => this.props.history.replace('/profile')} />
                        <Loading />
                    </div>
                </Page>
            )
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showConfirmDialog: () => { dispatch(showConfirmDialog()) },
        tryEditProfile: (data) => dispatch(tryEditProfile(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
