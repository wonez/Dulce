import { STORE_AUTH_DATA, REMOVE_AUTH_DATA } from '../types/authTypes'

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    expirationDate: null,
    isLogged: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STORE_AUTH_DATA : return {
            ...action.userData,
            isLogged: true     
        }
        case REMOVE_AUTH_DATA: return {
            ...initialState,
        }
        default: 
            return state
    }
}

export default reducer;