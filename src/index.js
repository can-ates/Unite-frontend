import React from 'react';
import {ThemeProvider} from "@material-ui/core/styles"
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import theme from "./components/ui/Theme"

import './index.css';
import App from './App';

import reducers from './reducers/index'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
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
