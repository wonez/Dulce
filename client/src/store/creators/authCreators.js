import { STORE_AUTH_DATA, REMOVE_AUTH_DATA } from '../types/authTypes'
import { startLoading, endLoading } from './uiCreator'
import axios from '../../utility/axios'

export const tryLogin = (userData) => {
    return dispatch => {
        dispatch(startLoading())
        axios.post('/user/login', userData)
            .then(res => {
                dispatch(endLoading())
                return res.data                
            }).then(data => {
                dispatch(storeAuthData(data))
                storeCookies(data)
            })
    }
}

export const trySignUp = (userData) => {
    return dispatch => {
        dispatch(startLoading())
        axios.post('/user/register', userData)
            .then(res => {
                dispatch(endLoading())
                return res.data
            }).then(data => {
                dispatch(storeAuthData(data))
                storeCookies(data)
            })
    }
}

export const checkCookies = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch(storeAuthData(user))
        }
    }
}

export const logout = () => {
    return dispatch => {
        deleteCookies();
        dispatch(removeAuthData())
    }
}

const storeAuthData = (userData) => {
    return{
        type: STORE_AUTH_DATA,
        user: userData
    }
}

const removeAuthData = () => {
    return {
        type: REMOVE_AUTH_DATA
    }
}

const storeCookies = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    // localStorage.setItem('token', JSON.stringify(data))
    // localStorage.setItem('expirationDate', JSON.stringify(data))
}

const deleteCookies = () => {
    localStorage.removeItem('user')
    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
}
