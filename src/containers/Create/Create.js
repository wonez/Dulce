import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'

import classes from './Create.scss'

class Create extends React.Component {

    state = {
        ingredients: [1,2,3],
        directions: [1,2,3]
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
            const filtered = [...prev[arr]].filter(item => {
                return item != num;
            })
            return{
                ...prev,
                [arr]: filtered
            }
        })
        console.log('remove')   
    }

    render(){
        return(
            <Aux>
                <Toolbar />
                <div className={classes.Container}>
                    <div className={classes.Create}>
                        <h2 className={classes.Create__Heading}>Create New</h2>
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
                                label="Preparation"
                                type="number"
                            />
                        </div>
                        <div className={classes.Preparation}>
                            <div className={classes.Preparation__Ingredients}>
                                <label className={classes.Preparation__Heading}>Ingredients</label>
                                {this.state.ingredients.map(num => (
                                    <RoundedFormItem 
                                        placeholder={`Element ${num}`}
                                        type="preparation"
                                        label="&gt;"
                                        key={num}
                                        click={() => {this.removeOne('ingredients', num)}}
                                    />
                                ))}
                                <button 
                                    onClick={() => this.addAnother('ingredients')}
                                    className={classes.Preparation__AddBtn}>Add another +</button>
                            </div>
                            <div className={classes.Preparation__Directions}>
                                <label className={classes.Preparation__Heading}>Directions</label>
                                {this.state.directions.map(num => (
                                    <RoundedFormItem
                                        placeholder={`Step ${num}`}
                                        type="preparation"
                                        label={num}
                                        key={num}
                                        click={() => {this.removeOne('directions', num)}}
                                    />
                                ))}
                                <button 
                                    onClick={() => this.addAnother('directions')}
                                    className={classes.Preparation__AddBtn}>Add another +</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Create;