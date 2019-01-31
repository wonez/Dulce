import { startLoading, endLoading} from '../creators/uiCreators'
import { storage } from '../../firebase'
import { updateAuthData } from '../creators/authCreators'
import axios from '../../utility/axios'

export const tryEditProfile = (data) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject)=>{
            handleFiles(data).then(data => {
                axios({
                    method: 'put',
                    url: `/user/${data._id}`,
                    data: data
                })
                .catch(err => {
                    reject(err.message)
                    dispatch(endLoading())
                })
                .then(res => {
                    dispatch(endLoading())
                    dispatch(updateAuthData(res.data))
                    resolve(null)
                })
            })
        })
    }
}

const handleFiles = (data) => {
    return new Promise((resolve, reject) => {
        let names = {}
        handleFile(data.avatarUrlFile).then(avatarUrl => {
            if(avatarUrl){
                names.avatarUrl = avatarUrl
            }
            handleFile(data.coverUrlFile).then(coverUrl => {
                if(coverUrl){
                    names.coverUrl = coverUrl;
                }
                resolve({
                    ...data,
                    ...names
                })
            })
        })
    })
}

const handleFile = (file) => {
    return new Promise((resolve, reject) => {
        if(file){
            const name = `${file.name.substring(0, 3)}_${Date.now()}`;
            const uploadTask = storage.ref('images/' + name).put(file)
            uploadTask.on('state_changed', snapshot => {
                //showing progress
            }, err => {
                throw err;
            }, () => {
                storage.ref('images').child(name).getDownloadURL().then(url => {
                    resolve(url)
                })
            })
        }else{
            resolve(null)
        }
    })
}

