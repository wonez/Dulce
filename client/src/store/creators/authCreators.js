import { STORE_AUTH_DATA, REMOVE_AUTH_DATA } from '../types/authTypes'
import { startLoading, endLoading } from './uiCreators'
import axios from '../../utility/axios'

export const tryLogin = (userData) => {
    return dispatch => {
        dispatch(startLoading())
        axios.post('/user/login', userData)
            .catch(err => {
                dispatch(endLoading());
                console.log(err.message);
            })
            .then(res => {
                dispatch(endLoading())
                if(res.status == 200) return res.data
                else throw new Error(res.status)
            }).then(data => {
                dispatch(storeAuthData(data))
                storeCookies(data)
            }).catch(err => {
                dispatch(endLoading());
                console.log(err.message);
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
        //check if expired get new
        const user = JSON.parse(localStorage.getItem('user'))
        const token = JSON.parse(localStorage.getItem('token'))
        if(user){
            dispatch(storeAuthData({user, token}))
        }
    }
}

export const updateAuthData = (userData) => {
    return dispatch => {
        dispatch(storeAuthData(userData));
        storeCookies(userData)
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
        userData: userData
    }
}

const removeAuthData = () => {
    return {
        type: REMOVE_AUTH_DATA
    }
}

const storeCookies = (userData) => {
    // console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData.user))
    localStorage.setItem('token', JSON.stringify(userData.token))
    // localStorage.setItem('expirationDate', JSON.stringify(data))
}

const deleteCookies = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
}
