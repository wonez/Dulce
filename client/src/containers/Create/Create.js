import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import FormButton from '../../UI/FormButton/FormButton'
import PostDataEntry from '../../components/PostDataEntry/PostDataEntry'

import { showConfirmDialog, tryCreatePost } from '../../store/index'

import classes from './Create.scss'

import Loading from '../../UI/Loading/Loading';
import Confirm from '../../UI/Confirm/Confirm'

class Create extends React.Component {

    state = {
        imgSrc: '',
        difficulties: [
            {value: 'easy', display: 'Easy'},
            {value: 'medium', display: 'Medium'},
            {value: 'hard', display: 'Hard'}
        ],
        categories: [
            {value: '<15min', display: 'Less than 15 minutes'},
            {value: 'chocolate', display: 'Chocolate'},
            {value: 'birthday', display: 'Birthday'},
            {value: 'fruit', display: 'Fruit Made'},
            {value: 'nobaking', display: 'No Baking needed'},
            {value: 'grandmas', display: 'Grandmas Recipe'},
            {value: 'wedding', display: 'Wedding'},
        ],
        form: {
            title: '',
            description: '',
            prepTime: '',
            ingredients: ['', '', '', '', ''],
            directions: ['', '', ''],
            level: 'easy',
            category: '<15min',
        },
        valid: false
    }

    isFormValid = (form) => {
        let valid = true;
        for(let key in form){
            if(key == 'ingredients' || key=='directions'){
                valid = valid && 
                    form[key].filter(item => (item != '')).length > 0;
            }else{
                valid = valid && form[key]
            }
        }
        return valid;
    }

    changeHandler = (value, type, i=-1) => {
        switch(type){
            case 'title':
            case 'description': 
            case 'prepTime':
            case 'level':
            case 'category':
                this.setState(prevState => {
                    const newState = {
                        ...prevState,
                        form: {
                            ...prevState.form,
                            [type]: value
                        }
                    }
                    newState.valid = this.isFormValid(newState.form)
                    return newState;
                })
                break;
            case 'directions':
            case 'ingredients':
                this.setState(prevState => {
                    const newState = {
                        ...prevState,
                        form: {
                            ...prevState.form,
                            [type]: [
                                ...prevState.form[type],
                            ]
                        }
                    }
                    newState.form[type][i] = value;
                    newState.valid = this.isFormValid(newState.form)
                    return newState;
                })
                break;
        }      
    }

    addAnother = (arr) => {
        this.setState(state => {
            return{
                ...state,
                form: {
                    ...state.form,
                    [arr]: [
                        ...state.form[arr],
                        ''
                    ]
                }
            }
        })
    }

    removeOne = (arr, index) => {
        this.setState(prev => {
            return{
                ...prev,
                form: {
                    ...prev.form,
                    [arr]: prev.form[arr].filter((_, i) =>{
                        return  i != index
                    })
                }
            }
        })
    }

    fileHandler = (data, file) => {
        this.setState(prevState => {
            return {
                ...prevState,
                imgSrc: data,
                form: {
                    ...prevState.form,
                    img: file
                }
            }
        })
    }

    submitHandler = () => {
        const postData = {
            ...this.state.form
        }
        this.props.tryCreatePost(postData)
            .then(res => {
                this.props.history.replace('/')
            })
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Container}>
                    <div className={classes.Create}>
                        <h2 className={classes.Create__Heading}>Create New</h2>
                        <p className={classes.Create__Required}>* All fields are required</p>
                        <PostDataEntry 
                            form={this.state.form}
                            changeHandler={this.changeHandler}
                            removeOne={this.removeOne}
                            addAnother={this.addAnother}
                            imgSrc={this.state.imgSrc}
                            fileHandler={this.fileHandler}
                            difficulties={this.state.difficulties}
                            categories={this.state.categories}
                        />
                        <div className={classes.Submit}>
                            <FormButton
                                type="secondary"
                                disabled={!(this.state.valid && this.state.imgSrc)}
                                click={this.submitHandler}
                                >Create New</FormButton>
                            <FormButton
                                type="danger"
                                click={this.props.showConfirmModal}
                                >Cancel</FormButton>
                        </div>
                    </div>
                    <Confirm confirmHandler={()=> this.props.history.push('/profile')}/>
                    <Loading />
                </div>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showConfirmModal: () => dispatch(showConfirmDialog()),
        tryCreatePost: (postData) => dispatch(tryCreatePost(postData))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Create));