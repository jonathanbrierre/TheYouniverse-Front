import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App';
import combined from './reducers/index'

const store = createStore(combined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store ={store} >
        <App />
    </Provider>
    , document.getElementById('root')
);

