import { SET_ONLINE, ADD_ONLINE, REMOVE_ONLINE } from '../types/chatTypes'

const initialState = {
    online: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ONLINE: return {
            ...state,
            online: action.online 
        }
        case ADD_ONLINE: return {
            ...state,
            online: state.online.indexOf(action.user) != -1 ? state.online : state.online.concat(action.user) 
        }
        case REMOVE_ONLINE: return {
            ...state,
            online: state.online.filter(user => {
                return user._id != action.user._id
            }) 
        }
        default: 
            return state
    }
}

export default reducer;