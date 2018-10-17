import React from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Toolbar/Toolbar'
import RoundedFormItem from '../../UI/RoundedFormItem/RoundedFormItem'

import classes from './Create.scss'

class Create extends React.Component {
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
                            <div className={classes.Preparation__Ingredient}>
                                fdas
                            </div>
                            <div className={classes.Preparation__Directions}>
                                fdas
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Create;