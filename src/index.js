import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App';
import combined from './reducers/index'
import {ActionCableProvider} from 'react-actioncable-provider'
import {BrowserRouter} from 'react-router-dom'

const store = createStore(combined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
    <Provider store ={store} >
        <BrowserRouter>
            <ActionCableProvider url='ws://localhost:3000/cable'>
                    <App />
            </ActionCableProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

