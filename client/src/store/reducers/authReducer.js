import { STORE_AUTH_DATA } from '../types/authTypes'

const initialState = {
    email: '',
    name: '',
    surname: '',
    id: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STORE_AUTH_DATA : return {
            ...state,
            ...action.user
        }
        default: 
            return state
    }
}

export default reducer;