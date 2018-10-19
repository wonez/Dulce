import React, { Component } from 'react'

import Page from '../../hoc/Page/Page'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem';
import FormButton from '../../UI/FormButton/FormButton'

import classes from './EditProfile.scss'
import ImagePicker from '../../UI/ImagePicker/ImagePicker';

class EditProfile extends Component {

    state = {
        profile: {
            name: 'John',
            surname: 'Doe',
            aboutMe: 'Hi, I’m John, I’m 36 and I work as a Digital Designer, I like sports, sweets and videogames as well.',
            joined: new Date('Oct 2, 2017'),
            gender: 'M',
            from: 'Wien, Austria',
            avatar: 'src/assets/profile.jpg',
            cover: 'src/assets/cover.jpg',
            followers: 623
        }
    }

    pickHandler = (img, data) => {
        this.setState({
            profile:{
                ...this.state.profile,
                [img]: data
            }
        })
    } 

    render(){
        return(
            <Page width="900">
                <h2 className={classes.Heading}>Edit Profile</h2>
                <div className={classes.Cover}
                    style={{backgroundImage: `url('${this.state.profile.cover}')`}}
                >
                    <ImagePicker 
                            id="cover"
                            label="Change photo"
                            type="cover"
                            fileHandler={(data) => { this.pickHandler('cover', data) }}
                        />
                    {/* choose photo */}
                    <div className={classes.Avatar}
                        style={{backgroundImage: `url('${this.state.profile.avatar}')`}}
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
                            label="Name" 
                            type="input"
                            placeholder='First Name'
                            />
                        <RoundedFormItem 
                            label="Surname" 
                            type="input"
                            placeholder='Last Name'
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
}

export default EditProfile;
