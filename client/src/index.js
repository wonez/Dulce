import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { generateStore } from './store/config'

import './index.scss';
import App from './containers/App/App';

const store = generateStore();

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
