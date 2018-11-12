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
                value={props.form.title}
                onChange={(e) => props.changeHandler(e.target.value, 'title')}
                style={{ width: '100%' }}
                placeholder='Name of your Recipe'
            />
            <RoundedFormItem
                label="Description"
                value={props.form.description}
                onChange={(e) => props.changeHandler(e.target.value, 'description')}
                type="textarea"
                placeholder='Short Description of your recipe'
            />
            <div className={classes.Preparation}>
                <div className={classes.Preparation__Ingredients}>
                    <label className={classes.Preparation__Heading}>Ingredients</label>
                    {props.form.ingredients.map((item, i) => (
                        <RoundedFormItem
                            placeholder={`Element ${i + 1}`}
                            type="ingredients"
                            label="&gt;"
                            key={i + 1}
                            value={item}
                            onChange={e => props.changeHandler(e.target.value, 'ingredients', i)}
                            click={() => props.removeOne('ingredients', i) }
                        />
                    ))}
                    <FormButton
                        type="primary"
                        click={() => props.addAnother('ingredients')}>
                        Add another +
                    </FormButton>
                </div>
                <div className={classes.Preparation__Directions}>
                    <label className={classes.Preparation__Heading}>Directions</label>
                    {props.form.directions.map((item, i) => (
                        <RoundedFormItem
                            placeholder={`Step ${i + 1}`}
                            type="directions"
                            label={i + 1}
                            key={i + 1}
                            value={item}
                            onChange={e => props.changeHandler(e.target.value, 'directions', i)}
                            click={() => props.removeOne('directions', i)}
                        />
                    ))}
                    <FormButton
                        type="primary"
                        click={() => props.addAnother('directions')}>
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
                    value={props.form.level}
                    onChange={(e) => props.changeHandler(e.target.value,'level')}
                />
                <RoundedFormItem
                    placeholder="e.g. 25min"
                    value={props.form.prepTime}
                    onChange={(e) => props.changeHandler(e.target.value, 'prepTime')}
                    label="Preparation Time (min)"
                    type="number"
                />
                <RoundedFormItem
                    label="Category"
                    type="select"
                    options={props.categories}
                    value={props.form.category}
                    onChange={(e) => props.changeHandler(e.target.value,'category')}
                />
            </div>
        </Aux>
    )
}

export default PostDataEntry;   