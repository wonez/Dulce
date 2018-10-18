import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'
import FormButton from '../../UI/FormButton/FormButton'

import classes from './Create.scss'

class Create extends React.Component {

    state = {
        ingredients: [1,2,3],
        directions: [1,2,3],
        imgSrc: ''
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

    fileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                imgSrc: [reader.result]
            })
        }
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
                        <div className={classes.Create__Summary}>
                            <RoundedFormItem 
                                label="Difficulty"
                                type="select"
                            />
                            <RoundedFormItem 
                                placeholder="Preparation time"
                                label="Preparation (mins)"
                                type="number"
                            />
                        </div>
                        <div className={classes.ImageBox}>
                            <input onChange={this.fileHandler} id="img" type="file" />
                            <div    className={classes.Img}
                                    style={{backgroundImage: `url('${this.state.imgSrc}')`}}>
                                {!this.state.imgSrc ? <p>No image to show</p> : null}
                            </div>
                            <label htmlFor="img">Add Image</label>
                        </div>
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
                                {/* <FormButton click={this.addAnother('ingredients')}>
                                    Add another +
                                </FormButton> */}
                                {/* <button 
                                    onClick={() => this.addAnother('ingredients')}
                                    className={classes.Preparation__AddBtn}>Add another +</button> */}
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
                                <button 
                                    onClick={() => this.addAnother('directions')}
                                    className={classes.Preparation__AddBtn}>Add another +</button>
                            </div>
                        </div>
                        <div className={classes.Submit}>
                            <button>Create New</button>
                            <button>Cancle</button>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Create;