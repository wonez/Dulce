import { LOGGED_IN, REGISTERED } from '../types/authTypes'

const initialState = {
    email: '',
    name: '',
    surname: '',
    id: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGED_IN : return {
            ...state,
            ...action.user
        }
        case REGISTERED : return {
            ...state,
            ...action.user
        }
        default: 
            return state
    }
}

export default reducer;