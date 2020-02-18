import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';
import { User } from 'reducers/userReducer';

import styled from 'styled-components';

interface AppProps {
  loggedIn: (currentUser: User) => void;
  loggedOut: () => void;
  readProject: (currentUser: User) => void;
}

const App: React.FC<AppProps> = ({ loggedIn, loggedOut, readProject }) => {
  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUser = { id: user.uid, name: user.displayName };
        loggedIn(currentUser);
        readProject(currentUser);
      } else {
        loggedOut();
      }
    });
  }, [loggedIn, loggedOut]);

  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Auth>
            <Navbar />
            <Route path="/tasks" component={TaskIndex} />
          </Auth>
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;

export default App;
