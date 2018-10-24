import { STORE_AUTH_DATA } from '../types/authTypes'
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

const storeAuthData = (userData) => {
    return{
        type: STORE_AUTH_DATA,
        user: userData
    }
}

const storeCookies = (data) => {
    //
}