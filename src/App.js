import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/ui/Header';
import Home from './components/Home';
import Communities from './components/Communities';
import JoinUs from './components/JoinUs';
import Community from './components/Community';
import CreateCommunity from './components/CreateCommunity';
import Post from './components/Post';
import UserDashboard from './components/UserDashboard';

function App() {
  const [value, setValue] = useState(0);

  return (
    <React.Fragment>
      <Header value={value} setValue={setValue} />
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Home {...props} setValue={setValue} />}
        />

        <Route
          exact
          path='/community/:id/post/:postId'
          render={props => <Post {...props} setValue={setValue} />}
        />

        <Route
          exact
          path='/communities'
          render={props => <Communities {...props} setValue={setValue} />}
        />

        <Route
          exact
          path='/create-community'
          render={props => <CreateCommunity {...props} setValue={setValue} />}
        />

        <Route
          exact
          path='/community/:id'
          render={props => <Community {...props} setValue={setValue} />}
        />

        <Route
          exact
          path='/joinus'
          render={props => <JoinUs {...props} setValue={setValue} />}
        />
        <Route
          exact
          path='/user/dashboard'
          render={props => <UserDashboard {...props} setValue={setValue} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
