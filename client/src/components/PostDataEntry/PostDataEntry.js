import React from 'react'

import classes from './PostDataEntry.scss'

import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'
import FormButton from '../../UI/FormButton/FormButton'
import ImagePicker from '../../UI/ImagePicker/ImagePicker'

import Aux from '../../hoc/Aux'

const PostDataEntry = (props) => {
    return (
        <Aux>
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
                    {props.ingredients.map((item, i) => (
                        <RoundedFormItem
                            placeholder={`Element ${i + 1}`}
                            type="preparation"
                            label="&gt;"
                            key={i + 1}
                            click={() => { props.removeOne('ingredients', item) }}
                        />
                    ))}
                    <FormButton
                        type="primary"
                        click={() => { props.addAnother('ingredients') }}>
                        Add another +
                                </FormButton>
                </div>
                <div className={classes.Preparation__Directions}>
                    <label className={classes.Preparation__Heading}>Directions</label>
                    {props.directions.map((item, i) => (
                        <RoundedFormItem
                            placeholder={`Step ${i + 1}`}
                            type="preparation"
                            label={i + 1}
                            key={i + 1}
                            click={() => { props.removeOne('directions', item) }}
                        />
                    ))}
                    <FormButton
                        type="primary"
                        click={() => { props.addAnother('directions') }}>
                        Add another +
                                </FormButton>
                </div>
            </div>
            <ImagePicker id='img'
                type='create'
                label='Add Image'
                src={props.imgSrc}
                fileHandler={props.fileHandler}
            />
            <div className={classes.Summary}>
                <RoundedFormItem
                    label="Difficulty"
                    type="select"
                    options={props.difficulties}
                />
                <RoundedFormItem
                    placeholder="e.g. 25min"
                    label="Preparation Time (min)"
                    type="number"
                />
                <RoundedFormItem
                    label="Category"
                    type="select"
                    options={props.categories}
                />
            </div>
        </Aux>
    )
}

export default PostDataEntry;