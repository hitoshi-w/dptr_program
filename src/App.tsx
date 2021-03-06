import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';
import { CurrentUser } from 'reducers/userReducer';

interface AppProps {
  loggedIn: (currentUser: CurrentUser) => void;
  loggedOut: () => void;
}

const App: React.FC<AppProps> = ({ loggedIn, loggedOut }) => {
  const [isFetching, setFetching] = useState(true);
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUser = { id: user.uid, name: user.displayName };
        loggedIn(currentUser);
        setFetching(false);
      } else {
        loggedOut();
        setFetching(false);
      }
    });
  }, [loggedIn, loggedOut]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home isFetching={isFetching} />} />
        <Auth>
          <Navbar />
          <Route path="/tasks" component={TaskIndex} />
        </Auth>
        <Redirect to="/tasks" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
