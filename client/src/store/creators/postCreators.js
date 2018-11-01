import { startLoading, endLoading } from './uiCreators'
import axios from '../../utility/axios'

export const tryCreatePost = (postData) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject) => {
            axios.post('/post', postData)
            .catch(err => {
                reject(err.message)
                dispatch(endLoading())
            })
            .then(res => {
                dispatch(endLoading())
                resolve(res)         
            })
        })
    }
}
