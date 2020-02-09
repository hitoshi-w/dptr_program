import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from 'containers/Home';
import Auth from 'components/Auth';
import TaskIndex from 'components/TaskIndex';

const App: React.SFC = () => {
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
