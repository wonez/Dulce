import { startLoading, endLoading} from '../creators/uiCreators'
import axios from '../../utility/axios'

export const tryEditProfile = (data) => {
    return dispatch => {
        console.log(data);
        // dispatch(startLoading())
        // axios.post('/user/')
    }
}

