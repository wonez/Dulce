import {    
    createStore, 
    applyMiddleware, 
    combineReducers,
    compose
} from 'redux'
import thunk from 'redux-thunk';

import auth from './reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth
})

export const generateStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}