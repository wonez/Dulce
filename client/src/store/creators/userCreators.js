import { startLoading, endLoading} from '../creators/uiCreators'
import { updateAuthData } from '../creators/authCreators'
import axios from '../../utility/axios'

export const tryEditProfile = (data) => {
    return dispatch => {
        dispatch(startLoading())
        return new Promise((resolve, reject)=>{
            axios.put(`/user/${data._id}`, data)
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

