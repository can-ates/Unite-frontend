import React, {useState} from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './components/ui/Header'
import Home from './components/Home'
import Community from './components/Community'
import JoinUs from './components/JoinUs'






function App() {
  const [value, setValue] = useState(0)


  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
