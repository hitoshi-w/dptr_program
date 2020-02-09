import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Home from 'containers/Home';
import Auth from 'components/Auth';
import TaskIndex from 'components/TaskIndex';

interface AppProps {
  loggedIn: (user: fb.User | null) => void;
  loggedOut: () => void;
  currentUser: fb.User | null;
}

const App: React.SFC<AppProps> = ({ loggedIn, loggedOut, currentUser }) => {
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      user ? loggedIn(user) : loggedOut();
    });
  }, [loggedIn, loggedOut]);
  console.log(currentUser);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Auth>
            <Route path="/tasks" component={TaskIndex} />
          </Auth>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
