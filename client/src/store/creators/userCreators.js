import { startLoading, endLoading} from '../creators/uiCreators'
import { updateAuthData } from '../creators/authCreators'
import axios from '../../utility/axios'

export const tryEditProfile = (data) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject)=>{
            const formData = new FormData();
            for(let key in data){   
                formData.append(key, data[key])
            }
            axios({
                method: 'put',
                url: `/user/${data._id}`,
                data: formData,
                headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
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
    }
}

