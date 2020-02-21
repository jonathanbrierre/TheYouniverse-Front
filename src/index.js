import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import {createStore} from 'redux'
import App from './App';
import combined from './reducers/index'

import {BrowserRouter} from 'react-router-dom'

const store = createStore(combined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
    <Provider store ={store} >
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

