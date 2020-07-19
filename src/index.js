import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'


import {ThemeProvider} from "@material-ui/core/styles"
import theme from "./components/ui/Theme"
import reducers from './reducers/index'
import './index.css';
import App from './App';

const middleware =[thunk, promiseMiddleware]

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware, promiseMiddleware))
)



ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>  
  ,
  document.getElementById('root')
);
