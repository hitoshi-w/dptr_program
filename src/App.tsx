import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';
import { UserEntity } from 'reducers/userReducer';

interface AppProps {
  currentUser: UserEntity | null;
  getUser: () => void;
  isFetching: boolean;
  loggedIn: (currentUser: UserEntity) => void;
  loggedOut: () => void;
}

const App: React.FC<AppProps> = ({
  getUser,
  currentUser,
  isFetching,
  loggedIn,
  loggedOut,
}) => {
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUser = { [user.uid]: { name: user.displayName } };
        loggedIn(currentUser);
      } else {
        loggedOut();
      }
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
