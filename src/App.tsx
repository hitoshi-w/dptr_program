import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';

export type User = fb.User | null;

interface AppProps {
  loggedIn: (user: User) => void;
  loggedOut: () => void;
  currentUser: User;
}

const App: React.FC<AppProps> = ({ loggedIn, loggedOut }) => {
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      user ? loggedIn(user) : loggedOut();
    });
  }, [loggedIn, loggedOut]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Auth>
            <Navbar />
            <Route path="/tasks" component={TaskIndex} />
          </Auth>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
