import thunk from 'redux-thunk';
import {    
    createStore, 
    applyMiddleware, 
    combineReducers,
    compose
} from 'redux'

import auth from './reducers/authReducer';
import ui from './reducers/uiReducer' 
import chat from './reducers/chatReducer' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth,
    ui,
    chat
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;