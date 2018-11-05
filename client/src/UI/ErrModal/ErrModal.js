import React from 'react'

import classes from './ErrModal.scss'
import FormButton from '../FormButton/FormButton';

const ErrModal = (props) => {

    let render = null;

    if(props.show){
        render = (
            <div className={classes.Modal} onClick={props.handleModal}>
                 <div className={classes.Box} onClick={(e) => {e.stopPropagation()}}>
                    <h2>{props.children}</h2>
                    <FormButton type="danger" click={() => props.handleModal()}>
                        Close
                    </FormButton>
                 </div>
             </div>
        )
    }

    return render
}

export default ErrModal;