import { SET_ONLINE, ADD_ONLINE, REMOVE_ONLINE, APPEND_MESSAGE, IS_TYPING, STOPPED_TYPING } from '../types/chatTypes'

const initialState = {
    online: [],
    messages: [],
    typing: false
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
        case APPEND_MESSAGE: return {
            ...state,
            messages: state.messages.concat(action.message)
        }
        case IS_TYPING: return{
            ...state,
            typing: true
        }
        case STOPPED_TYPING: return{
            ...state,
            typing: false
        }
        default: 
            return state
    }
}

export default reducer;