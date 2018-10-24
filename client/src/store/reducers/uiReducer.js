import { START_LOADING, END_LOADING } from '../types/uiTypes'

const initialState = {
    loading: false
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
        default: 
            return state
    }
}

export default reducer;