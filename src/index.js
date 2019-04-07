import React from 'react'
import {render} from 'react-dom'

import App from './App'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const store = applyMiddleware(promise, thunk)(createStore)(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);