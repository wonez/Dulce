import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'
import FormButton from '../../UI/FormButton/FormButton'
import ImagePicker from '../../UI/ImagePicker/ImagePicker'
import PostDataEntry from '../../components/PostDataEntry/PostDataEntry'

import classes from './Create.scss'

class Create extends React.Component {

    state = {
        ingredients: [1,2,3],
        directions: [1,2,3],
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
        ]
    }

    addAnother = (arr) => {
        this.setState(state => {
            return{
                ...state,
                [arr]: [
                    ...state[arr], 
                    state[arr].length + 1
                ]
            }
        })
    }

    removeOne = (arr, num) => {
        this.setState(prev => {
            let filtered = [...prev[arr]];
            if(filtered.length > 1){
                filtered = filtered.filter(item => {
                    return item != num;
                })
            }
            return{
                ...prev,
                [arr]: filtered
            }
        })
    }

    fileHandler = (data) => {
        this.setState({
            imgSrc: data
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
                            ingredients={this.state.ingredients}
                            directions={this.state.directions}
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
                                >Create New</FormButton>
                            <FormButton
                                type="danger"
                                >Cancel</FormButton>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Create;