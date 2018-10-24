import thunk from 'redux-thunk';
import {    
    createStore, 
    applyMiddleware, 
    combineReducers,
    compose
} from 'redux'

import auth from './reducers/authReducer';
import ui from './reducers/uiReducer' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth,
    ui
})

export const generateStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}