import { START_LOADING, END_LOADING, SHOW_CONFIRM_DIALOG, HIDE_CONFIRM_DIALOG} from '../types/uiTypes'

const initialState = {
    loading: false,
    confirm: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING : return {
            ...state,
            loading: true
        }
        case END_LOADING : return {
            ...state,
            loading: false
        }
        case SHOW_CONFIRM_DIALOG : return {
            ...state,
            confirm: true
        }
        case HIDE_CONFIRM_DIALOG : return {
            ...state,
            confirm: false
        }
        default: 
            return state
    }
}

export default reducer;