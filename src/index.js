import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers} from  'redux'  //compose allows us to set our own enhancers & middleware & dev tools is one of those.
import {Provider } from 'react-redux'
import thunk from 'redux-thunk'
import burgerBuilderReducer from './store/reducer/burgerBuilder'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
   })
   
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter basename="/HumansBurger">
                <App />
            </BrowserRouter>
        </Provider>
             , document.getElementById('root'));
registerServiceWorker();
