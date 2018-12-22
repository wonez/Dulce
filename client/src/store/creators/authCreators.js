import { STORE_AUTH_DATA, REMOVE_AUTH_DATA } from '../types/authTypes'
import { startLoading, endLoading } from './uiCreators'
import axios from '../../utility/axios'
import handleSocket from '../creators/chatCreators'

const handleRequest = (url, userData) => {
    return dispatch => {
        dispatch(startLoading())
        axios.post(url, userData)
            .catch(err => {
                dispatch(endLoading());
                console.log(err.message);
            })
            .then(res => {
                dispatch(endLoading())
                if(!res) throw new Error('Something went wrong')
                if(res.status == 200) return res.data
                else throw new Error(res.status)
            }).then(data => {
                console.log(data);
                dispatch(updateAuthData(data))
                createWebSocket();
            }).catch(err => {
                dispatch(endLoading());
                console.log(err.message);
        })
    }
}

export const tryLogin = (userData) => {
    return handleRequest('/user/login', userData)
}

export const trySignUp = (userData) => {
    return handleRequest('/user/register', userData);
}

export const facebookAuth = (userData) => {
    return handleRequest('user/facebook', userData)
}

export const googleAuth = (userData) => {
    return handleRequest('user/google', userData)
}

export const checkCookies = () => {
    return dispatch => {
        const id = JSON.parse(localStorage.getItem('id'))
        //check if expired and logout
        const token = JSON.parse(localStorage.getItem('token'))
        if(id){
            axios.get(`/user/${id}`)
                .then(res => {
                    if(res.status == 200){
                        dispatch(updateAuthData({user: res.data, token}))
                    }
                })
        }
    }
}

export const updateAuthData = (userData) => {
    return dispatch => {
        dispatch(storeAuthData(userData));
        createWebSocket();
        if(userData.token)
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
    localStorage.setItem('id', JSON.stringify(userData.user._id))
    localStorage.setItem('token', JSON.stringify(userData.token))
    // localStorage.setItem('expirationDate', JSON.stringify(data))
}

const deleteCookies = () => {
    // localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
}

const createWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8000')
    document.socket = socket;
    handleSocket(socket);
}
