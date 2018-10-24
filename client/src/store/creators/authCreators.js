import { LOGGED_IN } from '../types/authTypes'

export const tryLogin = (userData) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(loggedIn(userData))
        }, 500);
    }
}

const loggedIn = (userData) => {
    return{
        type: LOGGED_IN,
        user: userData
    }
}