import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import fb from 'config/fbConfig';

import Navbar from 'containers/navbar';
import Home from 'containers/home';
import Auth from 'containers/auth';
import TaskIndex from 'containers/tasks/taskIndex';
import { UserEntity } from 'reducers/userReducer';

import styled from 'styled-components';

interface AppProps {
  currentUser: UserEntity | null;
  loggedIn: (currentUser: UserEntity) => void;
  loggedOut: () => void;
}

const App: React.FC<AppProps> = ({ loggedIn, loggedOut }) => {
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
