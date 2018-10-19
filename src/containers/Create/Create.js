import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'
import FormButton from '../../UI/FormButton/FormButton'
import ImagePicker from '../../UI/ImagePicker/ImagePicker'

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
                        <RoundedFormItem 
                            label="Title"
                            type="input"
                            placeholder='Name of your Recipe'
                            />
                        <RoundedFormItem 
                            label="Description"
                            type="textarea"
                            placeholder='Short Description of your recipe'
                            />
                        <div className={classes.Preparation}>
                            <div className={classes.Preparation__Ingredients}>
                                <label className={classes.Preparation__Heading}>Ingredients</label>
                                {this.state.ingredients.map((item, i) => (
                                    <RoundedFormItem 
                                        placeholder={`Element ${i+1}`}
                                        type="preparation"
                                        label="&gt;"
                                        key={i+1}
                                        click={() => {this.removeOne('ingredients', item)}}
                                    />
                                ))}
                                <FormButton
                                    type="primary"
                                    click={() => {this.addAnother('ingredients')}}>
                                    Add another +
                                </FormButton>
                            </div>
                            <div className={classes.Preparation__Directions}>
                                <label className={classes.Preparation__Heading}>Directions</label>
                                {this.state.directions.map((item, i) => (
                                    <RoundedFormItem
                                        placeholder={`Step ${i + 1}`}
                                        type="preparation"
                                        label={i + 1}
                                        key={i + 1}
                                        click={() => {this.removeOne('directions', item)}}
                                    />
                                ))}
                                <FormButton
                                    type="primary"
                                    click={() => {this.addAnother('directions')}}>
                                    Add another +
                                </FormButton>
                            </div>
                        </div>
                        <ImagePicker    id='img'
                                        type='create'
                                        label='Add Image' 
                                        src={this.state.imgSrc}
                                        fileHandler={this.fileHandler}
                                        />
                        <div className={classes.Create__Summary}>
                            <RoundedFormItem 
                                label="Difficulty"
                                type="select"
                                options={this.state.difficulties}
                            />
                            <RoundedFormItem 
                                placeholder="e.g. 25min"
                                label="Preparation Time (min)"
                                type="number"
                            />
                            <RoundedFormItem 
                                label="Category"
                                type="select"
                                options={this.state.categories}
                            />
                        </div>
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