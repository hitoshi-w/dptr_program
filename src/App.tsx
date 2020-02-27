import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';
import { User } from 'reducers/userReducer';

interface AppProps {
  loggedIn: (currentUser: User) => void;
  loggedOut: () => void;
  readAll: (currentUser: User) => void;
}

const App: React.FC<AppProps> = ({ loggedIn, loggedOut, readAll }) => {
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUser = { id: user.uid, name: user.displayName };
        loggedIn(currentUser);
        readAll(currentUser);
      } else {
        loggedOut();
      }
    });
  }, [loggedIn, loggedOut, readAll]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Auth>
          <Navbar />
          <Route path="/tasks" component={TaskIndex} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
