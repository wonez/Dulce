import { startLoading, endLoading } from './uiCreators'
import { storage } from '../../firebase'
import axios from '../../utility/axios'

export const tryCreatePost = (data) => {
    return submitHandler(data, 'post', '/post')
}

export const tryEditPost = (data, id) => {
    return submitHandler(data, 'put', `/post/${id}`)
}

const submitHandler = (data, method, url) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject) => {
            data.ingredients = data.ingredients.filter(item => {
                return item != ''
            })
            data.directions = data.directions.filter(item => {
                return item != ''
            })
            handleFile(data).then(data => {
                axios({
                    method,
                    url,
                    data
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
        })
    }
}

const handleFile = (data) => {
    return new Promise((resolve, reject) => {
        if(!data.img){
            resolve({
                ...data
            })
        }else{
            const name = `${data.img.name.substring(0, 3)}_${Date.now()}`;
            const uploadTask = storage.ref('images/' + name).put(data.img)
            uploadTask.on('state_changed', snapshot => {
                //showing progress
            }, err => {
                throw err;
            }, () => {
                storage.ref('images').child(name).getDownloadURL().then(url => {
                    resolve({
                        ...data,
                        imgUrl: url
                    })
                })
            })
        }
    })
}
