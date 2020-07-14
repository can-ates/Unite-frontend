import React, {useState} from 'react';
import {ThemeProvider} from "@material-ui/core/styles"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/ui/Header'
import Home from './components/Home'
import Community from './components/Community'
import JoinUs from './components/JoinUs'

import theme from "./components/ui/Theme"


function App() {
  const [value, setValue] = useState(0);



  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}       
        />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  setValue={setValue}                
              />
              )}
            />
          
            <Route
              exact
              path="/communities"
              render={props => (
                <Community
                  {...props}
                  setValue={setValue}                  
              />
            )}
          />
            <Route
              exact
              path="/joinus"
              render={props => (
                <JoinUs
                  {...props}
                  setValue={setValue}
              />
              )}
            />
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
