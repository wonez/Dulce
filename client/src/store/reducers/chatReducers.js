import { RES_ONLINE } from '../types/chatTypes'

const initialState = {
    online: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case RES_ONLINE: return {
            ...state,
            online: action.online 
        }
        case RES_JOINED: return {
            ...state,
            online: state.online.concat(action.user) 
        }
        default: 
            return state
    }
}

export default reducer;