import { startLoading, endLoading } from './uiCreators'
import axios from '../../utility/axios'

export const tryCreatePost = (data) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('img', data.img)
            formData.append('data', JSON.stringify(data))
            axios({
                method: 'post',
                url: '/post',
                data: formData,
                headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
            })
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
